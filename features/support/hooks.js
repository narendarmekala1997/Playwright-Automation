const {Before,After} = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');
Before(async function(){

    const browser = await playwright.chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

     this.poManager = new POManager(this.page);

});
After(function(){
    console.log("I am the last to execute");
});