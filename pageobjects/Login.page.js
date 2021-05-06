require("webdriverio");
const expect = require('chai').expect;
const allure = require('wdio-allure-reporter');
const {addStep} = require('@wdio/allure-reporter').default;
const jsonfiledata = require('./../testData/testData.json');

class LoginPage {
    
    //Login Details

    get input_EmailAddress(){ return $('#email');}
    get input_Password(){ return $('#passwd');}
    get link_ForgotYourPassword() {return $("a[title='Recover your forgotten password']")};
    get btn_SignIn() {return $('#SubmitLogin')}
    
    get link_Signout(){  return $('//a[@title="Log me out"]');}
    
    loginIntoApplication(){
        try {
            let jsonstr = JSON.stringify(jsonfiledata);
            let data = JSON.parse(jsonstr);

            this.input_EmailAddress.waitForDisplayed({ timeout: 30000 });
            addStep("Wait until Email Address box should be visible");
            let email = data["Email"];
            this.input_EmailAddress.addValue(email);
            addStep("Entered Email as "+email);
            let password = data["Password"];
            this.input_Password.addValue(password);
            addStep("Entered Password as "+password);
            this.btn_SignIn.click();
            addStep("Clicked on SignIn Button");
        } catch (error) {
            console.log('error details are ->'+error);
            addStep("Error in loginIntoApplication method error is ->"+error,"","failed");
        
        }
    }

}

module.exports = new LoginPage();