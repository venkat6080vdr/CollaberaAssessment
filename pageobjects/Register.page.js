
require("webdriverio");
const expect = require('chai').expect;
const allure = require('wdio-allure-reporter');
const {addStep} = require('@wdio/allure-reporter').default;
const jsonfiledata = require('./../testData/testData.json');

class RegisterPage {

    //Create Account details
    get heading_CreateAnAccount(){ return $('#create-account_form .page-subheading');}
    get input_EmailAddress(){ return $('#email_create');}
    get btn_CreateAnAccount(){ return $('#SubmitCreate');}

    //Registration Details
    get heading_YourPersonalInformation(){ return $('//h3[text()="Your personal information"]');}
    get rb_MrTitle() {return $('label[for="id_gender1"]')};
    get input_FirstName() {return $('#customer_firstname')};
    get input_LastName() {return $('#customer_lastname')};
    get input_Email() {return $('#email')};
    get input_Password() {return $('#passwd')};
    get dd_Days_DOB() {return $('#days')};
    get dd_Months_DOB() {return $('#months')};
    get dd_Years_DOB() {return $('#years')};
    get cb_SignUpForNewletter() {return $('#newsletter')};
    get cb_ReceivespecialOffers() {return $('#optin')};
    
    //Your Address detials
    get input_FirstName_Address() {return $('#firstname')};
    get input_LastName_Address() {return $('#lastname')};
    get input_Company() {return $('#company')};
    get input_Address() {return $('#address1')};
    get input_Address2() {return $('#address2')};
    get input_City() {return $('#city')};
    get dd_State() {return $('#id_state')};
    get input_ZipCode() {return $('#postcode')};
    get dd_Country() {return $('#id_country')};
    get input_AdditionalInformation() {return $('#other')};
    get input_HomePhone() {return $('#phone')};
    get input_MobilePhone() {return $('#phone_mobile')};
    get input_Assign_AnAddressAlias () {return $('#alias')};
    get btn_Register (){return $('#submitAccount')};
   //After Login Detials
    get link_Signout(){  return $('//a[@title="Log me out"]');}
    
    registerNewAccount(){
        try {
            let jsonstr = JSON.stringify(jsonfiledata);
            let data = JSON.parse(jsonstr);

            this.heading_CreateAnAccount.waitForDisplayed({ timeout: 30000 });
           addStep("Wait to display Create an Account Heading");
            let username = data['Email'];
            this.input_EmailAddress.addValue(username);
           addStep("Entered Email Address as "+username);
           this.btn_CreateAnAccount.click();
           addStep("Clicked on Create An Account Button");

        //Entering User detils to register
        this.heading_YourPersonalInformation.waitForDisplayed({ timeout: 30000 });
            expect(this.heading_YourPersonalInformation.isDisplayed()).to.equal(true);
           addStep("Successfully Validated Personal Information Heading is dispalyed ");

           this.rb_MrTitle.click();
           addStep("Clicked on Mr Title Checkbox");

            let firstName = data['Firstname'];
            this.input_FirstName.addValue(firstName);
           addStep("Entered First Name as "+firstName);

            let lastName = data['Lastname'];
            this.input_LastName.addValue(lastName);
           addStep("Entered Last Name as "+lastName);

            let password = data['Password'];
            this.input_Password.addValue(password);
           addStep("Entered Password as "+password);

            let day_DOB = data['Day_DOB'];
            this.dd_Days_DOB.selectByAttribute("value",day_DOB);
           addStep("Selected Day in DOB as "+day_DOB);

            let month_DOB = data['Month_DOB']
            this.dd_Months_DOB.selectByAttribute("value",month_DOB);
           addStep("Selected Month in DOB as "+month_DOB);

            let year_DOB = data['Year_DOB'];
            this.dd_Years_DOB.selectByAttribute("value",year_DOB);
           addStep("Selected Year in DOB as "+year_DOB);

           this.cb_SignUpForNewletter.click();
           addStep("Clicked on SignUp For Newletter checkbox");
           this.cb_ReceivespecialOffers.click();
           addStep("Clicked on Receive special Offers checkbox");

            let act_Company = data['Company'];
            this.input_Company.addValue(act_Company);
           addStep("Entered Company as "+act_Company);

            let act_Address = data['Address'];
            this.input_Address.addValue(act_Address);
           addStep("Entered Address as "+act_Address);

            let act_Address2 = data['AddressLine2'];
            this.input_Address2.addValue(act_Address2);
           addStep("Entered Address2 as "+act_Address2);

            let act_City = data['City'];
            this.input_City.addValue(act_City);
           addStep("Entered City as "+act_City);

            let act_State = data['State'];
            this.dd_State.selectByVisibleText(data['State']);
           addStep("Selected State as "+act_State);

            let act_ZipCode = data['ZipCode'];
            this.input_ZipCode.addValue(data['ZipCode']);
           addStep("Entered ZipCode as "+act_ZipCode);

            let act_Country = data['Country'];
            this.dd_Country.selectByVisibleText(data['Country']);
           addStep("Entered Country as "+act_Country);

            let act_AdditionalInformation = data['AdditionalInformation'];
            this.input_AdditionalInformation.addValue(act_AdditionalInformation);
           addStep("Entered AditionalInformation as "+act_AdditionalInformation);

            let act_HomePhone = data['HomePhone'];
            this.input_HomePhone.addValue(act_HomePhone);
           addStep("Entered HomePhone as "+act_HomePhone);

            let act_MobilePhone = data['MobilePhone'];
            this.input_MobilePhone.addValue(act_MobilePhone);
           addStep("Entered MobilePhone as "+act_MobilePhone);

            let act_AddressAlias = data['AddressAlias'];
            this.input_Assign_AnAddressAlias.addValue(act_AddressAlias);
           addStep("Entered Address Alias as "+act_AddressAlias);
           this.btn_Register.click();
          addStep("Clicked on Register Button");

          this.link_Signout.waitForDisplayed({ timeout: 30000 });
          this.link_Signout.click();
           addStep("Clicked on SignOut Button");

        } catch (error) {
            console.log("Error details are ->"+error)
           addStep("Error in registerNewAccount method error is ->"+error,"","failed");
        }
    }
    
}

module.exports = new RegisterPage();