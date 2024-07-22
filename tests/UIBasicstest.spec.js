const {test, expect} = require('@playwright/test');

test('second playwright test',async ({page})=>
{
    
    await page.goto("https://www.google.com");
     console.log(await page.title());
     await expect(page).toHaveTitle("Google");
});
test('Complete E2E test',async ({browser})=>
{
    const productName="ZARA COAT 3";
    const context =await  browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body ");
    const email = page.locator('#userEmail');
    const pass = page.locator('#userPassword');
    const submit = page.locator('#login');
    const emailId = 'narendarmekala.1997@gmail.com';
    await page.goto("https://rahulshettyacademy.com/client/");
    await email.fill(emailId);
    await pass.fill('Naren@1997');
    await submit.click(emailId);
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
test('child window handling',async ({browser})=>{

    const context = await browser.newContext();
    const page =  await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const blink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
     [
        context.waitForEvent('page'),
        blink.click(),
     ]   
    )
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
   // await page.pause();
    


});
test('UI Components', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const pass= page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator('select.form-control');
    const blink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();

    await expect(blink).toHaveAttribute("class","blinkingText");
   // await page.pause();

});
test('First playwright test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css , xpath
    await userName.type("narender mekala");
    await page.locator("[type='password']").type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(await page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.nth(0).textContent())
   // console.log(await cardTitles.nth(1).textContent())

   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);

});
