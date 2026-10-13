import {test,expect} from '@playwright/test';
import {getSalesConfig,validatePaymentUrl} from '../lib/sales';
import {trackWithConsent,readUtm,type AllowedEvent} from '../lib/tracking';

test('sales gate rejects missing details and unsafe payment destinations',()=>{
 const input={paymentUrl:'https://payment.ecpay.com.tw/test-store',confirmed:'true',name:'測試音訊',price:'100',content:'一段 WAV，30 秒',deliveryTime:'核款後一個工作日',supportEmail:'test@example.com',sellerName:'測試賣方'};
 expect(getSalesConfig(input).ready).toBe(true);
 for(const paymentUrl of ['','javascript:alert(1)','http://payment.ecpay.com.tw/shop','https://payment.ecpay.com.tw.evil.example/shop','https://payment-stage.ecpay.com.tw/shop','https://user:pass@payment.ecpay.com.tw/shop','https://payment.ecpay.com.tw/','https://payment.ecpay.com.tw:444/shop']){
  expect(validatePaymentUrl(paymentUrl)).toBeNull();
  expect(getSalesConfig({...input,paymentUrl}).ready).toBe(false);
 }
 for(const field of Object.keys(input)){
  expect(getSalesConfig({...input,[field]:''}).ready).toBe(false);
 }
 for(const price of ['-1','0','NaN','1.5','Infinity'])expect(getSalesConfig({...input,price}).ready).toBe(false);
});

test('tracking requires consent and never dispatches Purchase',()=>{
 const events:string[]=[];
 const send=(event:AllowedEvent)=>events.push(event);
 trackWithConsent('ViewContent',false,send);
 trackWithConsent('Purchase' as AllowedEvent,true,send);
 expect(events).toEqual([]);
 trackWithConsent('ViewContent',true,send);
 expect(events).toEqual(['ViewContent']);
 expect(readUtm('?utm_source=meta&utm_campaign=launch&email=private@example.com')).toEqual({utm_source:'meta',utm_campaign:'launch'});
});

test('mobile test state disables all purchasing and preserves playable preview',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/?utm_source=meta');
 await expect(page.getByRole('heading',{name:/世界很快，\s*你可以慢一點。/})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.getByRole('button',{name:'測試展示，尚未開放購買'})).toHaveCount(3);
 for(const button of await page.getByRole('button',{name:'測試展示，尚未開放購買'}).all())await expect(button).toBeDisabled();
 await expect(page.locator('a[href*="ecpay"]')).toHaveCount(0);
 await expect(page.locator('body')).not.toContainText('680');
 await expect(page.locator('body')).not.toContainText('37 分鐘');
 const audio=page.locator('audio');
 await audio.evaluate((el:HTMLAudioElement)=>el.load());
 await expect.poll(()=>audio.evaluate((el:HTMLAudioElement)=>el.duration)).toBeCloseTo(30,0);
 await audio.evaluate((el:HTMLAudioElement)=>el.play());
 await expect.poll(()=>audio.evaluate((el:HTMLAudioElement)=>el.currentTime)).toBeGreaterThan(0);
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('link',{name:'下載試聽音訊'}).click();
 expect((await downloadPromise).suggestedFilename()).toContain('.wav');
 expect(await page.evaluate(()=>sessionStorage.length)).toBe(0);
 await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
});

test('old checkout redirects; spoofed return never confirms payment or unlocks goods',async({page})=>{
 await page.goto('/checkout');
 await expect(page).toHaveURL(/\/payment$/);
 await expect(page.getByRole('heading',{name:'付款與商品交付說明'})).toBeVisible();
 await page.evaluate(()=>sessionStorage.setItem('manyu-order',JSON.stringify({id:'fake',name:'測試',email:'test@example.com'})));
 await page.goto('/success?paid=true&status=success');
 await expect(page.getByRole('heading',{name:'付款狀態尚待確認'})).toBeVisible();
 await expect(page.locator('a[download]')).toHaveCount(0);
 await expect(page.getByRole('heading',{name:/謝謝你/})).toHaveCount(0);
});

test('delivery and all policies are accessible on mobile',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const [path,title] of [['/payment','付款與商品交付說明'],['/privacy','隱私權政策'],['/terms','服務條款'],['/refunds','退款政策']]){
  await page.goto(path);
  await expect(page.getByRole('heading',{name:title,exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('footer').getByRole('link',{name:'退款政策'})).toBeVisible();
 }
});
