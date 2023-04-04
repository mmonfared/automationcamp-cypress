let locators = require("./locators")

export class LoginPage {

    LOGINPAGE_USERNAME_INPUT = 'input[name=username]'
    PASSWORD_INPUT = 'input[name=password]'
    LOGIN_BUTTON = 'button[type=submit]'

    openLoginPage(){
        return cy.visit('https://opensource-demo.orangehrmlive.com')
    }
    enterUserName(username){
        return cy.get(this.LOGINPAGE_USERNAME_INPUT).type(username)
        // return cy.get(locators.LOGINPAGE.LOGINPAGE_USERNAME_INPUT).type(username)
    }
    enterPassword(password){
        return cy.get(this.PASSWORD_INPUT).type(password)
    }
    clickOnLoginButton(){
        return cy.get(this.LOGIN_BUTTON).click()
    }
    verifyInvalidCredMessage(){
        return cy.contains('Invalid credentials').should('be.visible')
    }
    loginWithAdminUser(){
        this.openLoginPage()
        this.enterUserName('Admin')
        this.enterPassword('admin123')
        this.clickOnLoginButton()
        return this
    }
}
