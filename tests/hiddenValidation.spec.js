import {test,expect} from '@playwright/test'

test('Hidden Element Validations and Pop Up Validations',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   // await page.pause();

    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framespage = page.frameLocator("#courses-iframe");

    await framespage.locator("li a[href*='lifetime-access']:visible").click(); 
    const sub = await framespage.locator(".text h2").textContent();
    const num = sub.split(" ")[1];
    console.log(num);
});
test('screenshot and Visual Comparison',async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partial.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
   // await page.pause();
});

test('visual Testing',async ({page})=>{
    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
    //await page.pause();
});