/// <reference types="Cypress" />

// admin@automationcamp.ir
// support@automationcamp.ir
describe("Session 18 - Login by UI", function() { //38 seconds
    beforeEach(function(){
        cy.visit("https://app.clockify.me/en/login")
        cy.get("input#email").type("admin@automationcamp.ir")
        cy.get("input#password").type("123456")
        cy.get("button[type=submit]").click()
    })
    it('Test1', function(){
        
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test2', function(){

        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test3', function(){

        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
})

describe("Session 18 - Login by API", function() {  //22 Seconds
    beforeEach(function(){
        cy.request('POST', 'https://global.api.clockify.me/auth/token', 
        {email: "admin@automationcamp.ir", password: "123456"})
        .then(($resp) => {
            expect($resp.status).to.eq(200)
            window.localStorage.setItem('token', $resp.body.token)
        })
    })
    it('Test1', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test2', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test3', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
})

describe("Session 18 - cy.session() - UI", function() {  //29 Seconds
    beforeEach(function(){
        cy.session('session1', () => {
            cy.visit("https://app.clockify.me/en/login")
            cy.get("input#email").type("admin@automationcamp.ir")
            cy.get("input#password").type("123456")
            cy.get("button[type=submit]").click()
            cy.location('pathname').should('eq','/tracker')
        })
    })
    it('Test1', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test2', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test3', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
})

describe("Session 18 - cy.session() - API", function() {  // 13 Seconds
    beforeEach(function(){
        cy.session('session1', () => {
            cy.request('POST', 'https://global.api.clockify.me/auth/token', 
            {email: "admin@automationcamp.ir", password: "123456"})
            .then(($resp) => {
                expect($resp.status).to.eq(200)
                window.localStorage.setItem('token', $resp.body.token)
        })
        })
    })
    it('Test1', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test2', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it('Test3', function(){
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
})

it('Multiple Sessions', function() {
    // Create
    cy.loginUsingAPI('admin@automationcamp.ir', '123456')
    cy.visit("https://app.clockify.me")
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    cy.loginUsingAPI('support@automationcamp.ir', '123456')
    cy.visit("https://app.clockify.me")
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Support')
    // Switch   
    cy.loginUsingAPI('admin@automationcamp.ir', '123456')
    cy.visit("https://app.clockify.me")
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    cy.loginUsingAPI('support@automationcamp.ir', '123456')
    cy.visit("https://app.clockify.me")
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Support')
})

it('Logout', function() {
    // Create
    cy.loginUsingAPI('admin@automationcamp.ir', '123456')
    cy.visit("https://app.clockify.me")
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    cy.logout()
    cy.get("input#email").should('be.visible')
    
})
it('Cookies', function() {
    Cypress.Cookies.debug(true)
    cy.visit("https://app.clockify.me")
    cy.setCookie('MyCookie', 'automationcamp')
    cy.getCookie('MyCookie').should('have.property', 'value', 'automationcamp')
    .then( (cookie) => {
        console.log(cookie)
    })
    cy.clearCookie('MyCookie')
    cy.getCookie('MyCookie').should('be.null')
    cy.clearAllCookies()
})