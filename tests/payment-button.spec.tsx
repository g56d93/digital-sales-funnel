import {test,expect} from '@playwright/test';
import {renderToStaticMarkup} from 'react-dom/server';
import PurchaseButton from '../components/PurchaseButton';
import {getSalesConfig} from '../lib/sales';

test('enabled purchase button uses only the configured official link',()=>{
 const config=getSalesConfig({paymentUrl:'https://payment.ecpay.com.tw/test-store?reference=abc',confirmed:'true',name:'測試音訊',price:'100',content:'WAV，一段 30 秒',deliveryTime:'核款後一個工作日',supportEmail:'test@example.com',sellerName:'測試賣方'});
 const html=renderToStaticMarkup(<PurchaseButton config={config}/>);
 expect(html).toContain('href="https://payment.ecpay.com.tw/test-store?reference=abc"');
 expect(html).not.toContain('disabled');
 const disabled=renderToStaticMarkup(<PurchaseButton config={{...config,ready:false}}/>);
 expect(disabled).toContain('disabled');
 expect(disabled).not.toContain('href');
});
