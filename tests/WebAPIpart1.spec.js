import {test,expect,request} from '@playwright/test'
let webContext;

test.beforeAll( async ({browser})=>
{
    const context =await  browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.locator('#userEmail');
    const pass = page.locator('#userPassword');
    await email.fill('narendarmekala.1997@gmail.com');
    await pass.fill('Naren@1997');
    const submit = page.locator('#login');

    await submit.click();
    await page.waitForLoadState("networkidle");

    await context.storageState({path:'state.json'});
    webContext= await browser.newContext({storageState:'state.json'});


});
test('Session Storage',async ()=>{
    const productName="ZARA COAT 3";
    const emailId = 'narendarmekala.1997@gmail.com';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
   // await page.pause();

    const products = page.locator(".card-body ");
    const cardTitles = page.locator(".card-body b");
    await  page.waitForLoadState('networkidle');
    const all = await cardTitles.allTextContents();
    console.log(all);

   const count= await products.count();
   for( let i=0 ; i<count ; ++i){

       if( await products.nth(i).locator("b").textContent() == productName){
           //add to cart
           await products.nth(i).locator("text= Add to Cart").click();
           break;
       }
   }
   await page.locator("[routerlink='/dashboard/cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("Ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionscount = await dropdown.locator("button").count();
   for(let i=0 ; i < optionscount ; ++i)
   {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   await page.locator("button[routerlink*='myorders']").click();

   await page.locator("tbody").waitFor();

   const rows =  await page.locator("tbody tr");
   const counter = await rows.count();

   for(let i=0 ; i< counter ; ++i){
        const text1 = await rows.nth(i).locator("th").textContent();
        if(id.includes(text1)){
            
            await rows.nth(i).locator("button").first().click();
            break;
        }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(id.includes(orderIdDetails)).toBeTruthy();
   //await page.pause();


});
