const homePage = require('./../pageobjects/Home.page');
const registerPage = require('./../pageobjects/Register.page');
const loginPage = require('./../pageobjects/Login.page');

describe("Register User and  Sign In and Add one product and validate", ()=>{

    it("Register User and  Sign In and Add one product and validate",()=>{
        homePage.launchApplicationAndSignIN();
        registerPage.registerNewAccount();
        loginPage.loginIntoApplication();
        homePage.validateLoginUserDetailsandNavigateToHomePage();
        homePage.addProductToCartandValidate();
    })
})
