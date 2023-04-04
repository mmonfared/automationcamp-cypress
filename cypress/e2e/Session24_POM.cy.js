/// <reference types='cypress'/>
import { LoginPage } from "./pages/loginPage"
import { DashboardPage } from "./pages/dashboardPage"

let login = new LoginPage()
let dashboard = new DashboardPage()

describe('Session 24 - Page Object Model', () => {
    context('Login', () => {
        it('Verify valid login', () => {
            login.openLoginPage()
            login.enterUserName('Admin')
            login.enterPassword('admin123')
            login.clickOnLoginButton()
            dashboard.verifyProfileButtonExists()
        })
        it('Verify invalid login', () => {
            login.openLoginPage()
            login.enterUserName('Admin')
            login.enterPassword('admin12')
            login.clickOnLoginButton()
            login.verifyInvalidCredMessage()
        })
    })
    context('Admin', () => {
        beforeEach(() => {
            cy.session('userSession', () => {
                login.loginWithAdminUser()
                dashboard.verifyProfileButtonExists()
            })
        })
        it('Verify filter users by username', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
            cy.get('input.oxd-input.oxd-input--active').eq(1).type('Admin')
            cy.get('button[type=submit]').click({force: true})
            cy.contains('(1) Record Found')
        })
        it('Verify filter users by role', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
            cy.get('.oxd-select-text.oxd-select-text--active').eq(0).click()
            cy.get('.oxd-select-dropdown > :nth-child(2) > span').click()
            cy.get('button[type=submit]').click({force: true})
            cy.contains('(6) Records Found')
            
        })
    })
})
