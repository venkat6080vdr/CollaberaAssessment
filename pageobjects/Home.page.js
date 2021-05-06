require("webdriverio");
const expect = require('chai').expect;
const allure = require('wdio-allure-reporter');
const {addStep} = require('@wdio/allure-reporter').default;
const jsonfiledata = require('./../testData/testData.json');


class HomePage {

    //Before Login objects
    get link_SignIn(){  return $('a.login');}
    get link_Signout(){  return $('//a[@title="Log me out"]');}

    //After Login objects
    get link_HomeButton(){return $('//a[@title="Return to Home"]');}
    get text_CustomerAccountName(){return $('//a[@title="View my customer account"]/span')};
    get img_FirstProduct(){ return $('(//div[@class="product-image-container"]//img)[1]')};
    get price_firstProduct(){return $('(//div[@class="product-image-container"]//img/following::div[@class="right-block"]//span)[1]')}
    get addToCart_FirstProduct() { return $('(//div[@class="product-image-container"]//img/following::a[@title="Add to cart"])[1]')} 

    get btn_ProceedToCheckout() { return $('//*[@title="Proceed to checkout"]')} 
    get btn_ContinueShopping() { return $('//*[@title="Continue shopping"]')}

    get heading_ShoppingCartSummary() {return $('h1#cart_title')};
    get text_ProductCount() {return $('#summary_products_quantity')};
    get tab_Summary(){return $('#order_step li[class*="first"]')}
    get text_ProductName_Cart() {return $('td.cart_description p.product-name a')};
    get text_TotalPrice_Cart() {return $('span[id*="total_product_price"]')}
    

   

    launchApplicationAndSignIN(){
        try {
            browser.maximizeWindow();
            browser.url('/');
            addStep("Application url is launched");
            this.link_SignIn.waitForDisplayed({ timeout: 30000 });
            addStep("Wait for until SignIn Button Displayed");
            this.link_SignIn.click();
            addStep("Clicked on SignIn Button");
        } catch (error) {
            console.log('error details are ->'+error);
            addStep("Error in clickonSignIn method error is ->"+error,"","failed");
        }
    }

    validateLoginUserDetailsandNavigateToHomePage(){
        try {
            let jsonstr = JSON.stringify(jsonfiledata);
            let data = JSON.parse(jsonstr);
            this.link_Signout.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until Sing Out link visible");
            this.text_CustomerAccountName.waitForDisplayed({ timeout: 30000 });
            addStep("Wait for to display Customer AccountName");
            let act_UserName = this.text_CustomerAccountName.getText().trim();
            addStep("Account Name Get the Sign In User Account Name "+act_UserName);
            expect(act_UserName).to.equal(`${data['Firstname']} ${data['Lastname']}`);
            addStep("Successfully validated Login user Account Name as "+act_UserName);

            this.link_HomeButton.click();
            addStep("Clicked on Home Button");
        } catch (error) {
            console.log('error details are ->'+error);
            addStep("Error in validateLoginUserDetailsandNavigateToHomePage method error is ->"+error,"","failed");
        }
    }

   
    addProductToCartandValidate(){
        try {
            this.img_FirstProduct.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until First Product Displayed");
            let act_ProductName = this.img_FirstProduct.getAttribute('title');
            addStep("Get the First Product Name ->"+act_ProductName);
            let act_Price = this.price_firstProduct.getText();
            addStep("Get the First Product Price ->"+act_Price);
            this.img_FirstProduct.scrollIntoView();
            this.img_FirstProduct.moveTo();
            addStep("Moved to First Product");
            this.addToCart_FirstProduct.click();
            addStep("Clicked on Add to Cart Button");
            this.btn_ContinueShopping.waitForDisplayed({ timeout: 30000 });
            this.btn_ProceedToCheckout.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until to display ProceedToCheckout button");
            this.btn_ProceedToCheckout.click();
            addStep("Clicked on ProceedToCheckout Button");

            this.heading_ShoppingCartSummary.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until to display ShoppingCart Summary Heading");
            expect(this.heading_ShoppingCartSummary.isDisplayed()).to.equal(true);
            addStep("Successfully Validated ShoppingCart Summary Heading is dispalyed ");

            this.tab_Summary.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until to display Tab Summary");
            let exp_ProductName_Cart = this.text_ProductName_Cart.getText().trim();
            addStep("Get the ProductName in Cart ->"+exp_ProductName_Cart);
            let exp_Price_Cart = this.text_TotalPrice_Cart.getText().trim();
            addStep("Get the Pritce in Cart ->"+exp_Price_Cart);
            expect(exp_ProductName_Cart).to.equal(act_ProductName);
            addStep("Successfully Validated  Product name -> "+exp_ProductName_Cart);
            expect(exp_Price_Cart).to.equal(act_Price);
            addStep("Successfully Validated  Product Price -> "+exp_Price_Cart);

        } catch (error) {
            console.log("Error as ->"+error);
            addStep("Error in addProductToCartandValidate method error is ->"+error,"","failed");
        }
    }

}
module.exports = new HomePage();