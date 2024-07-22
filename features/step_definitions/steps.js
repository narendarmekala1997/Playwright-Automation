const {When,Then,Given} = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');



Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000},async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    
   
    //console.log(username);
  
    const loginPage = this.poManager.getLoginPage(); 
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
  });

  When('Add {string} to cart',async function (productName) {
    // Write code here that turns the phrase above into concrete actions
     this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
    //await page.pause();
  });

  Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
  });
  Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = this.page.locator("#username");
    const signIn = this.page.locator('#signInBtn');
    // Write code here that turns the phrase above into concrete actions
    
    console.log(await this.page.title());
  //css , xpath
    await userName.type(username);
    await this.page.locator("[type='password']").type(password);
    await signIn.click();
  });
  Then('Verify Error Message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(await this.page.locator("[style*='block']")).toContainText('Incorrect');

  });
 
  
