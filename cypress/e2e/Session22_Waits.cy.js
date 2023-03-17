/// <reference types='cypress'/>
/// <reference types="cypress-iframe" />


describe('Explicit and Implicit waits', function () {
    beforeEach(function () {
        cy.visit("https://play1.automationcamp.ir/expected_conditions.html")
    })
    it('Explicit Wait', function () {
        cy.get('#min_wait').clear().type(2)
        cy.get('#max_wait').clear().type(2)
        cy.get('#visibility_trigger').click()
        cy.wait(2000)
        cy.get('#visibility_target').should('be.visible')
    })
    it('Implicit Wait', function () {
        cy.get('#min_wait').clear().type(5)
        cy.get('#max_wait').clear().type(5)
        cy.get('#visibility_trigger').click()
        // all queries has default implicitly wait which is set in cypress.config.js Globally
        cy.get('#visibility_target').should('be.visible')
    })
    it('Implicit Wait - Command level', function () {
        cy.get('#min_wait', { timeout: 7000 }).clear().type(5)
        cy.get('#max_wait').clear().type(5)
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })

})

describe('Change default timeout in describe level', { defaultCommandTimeout: 6000 }, function () {
    beforeEach(function () {
        cy.visit("https://play1.automationcamp.ir/expected_conditions.html")
        cy.get('#min_wait').clear().type(5)
        cy.get('#max_wait').clear().type(5)
    })
    it('Slow test 1', function () {
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
    it('Slow test 2', function () {
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
})

describe('Change default timeout in test level', function () {
    beforeEach(function () {
        cy.visit("https://play1.automationcamp.ir/expected_conditions.html")
    })
    it('Test with different timeout for its actions', { defaultCommandTimeout: 6000 }, function () {
        cy.get('#min_wait').clear().type(5)
        cy.get('#max_wait').clear().type(5)
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
    it('Change default timeout in runtime', function () {
        cy.get('#min_wait').clear().type(2)
        cy.get('#max_wait').clear().type(2)
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
        cy.reload()
        cy.log(Cypress.config('defaultCommandTimeout'))
        Cypress.config('defaultCommandTimeout', 6000) // Cypress issue: https://github.com/cypress-io/cypress/issues/25991
        cy.log(Cypress.config('defaultCommandTimeout'))
        cy.get('#min_wait').clear().type(5)
        cy.get('#max_wait').clear().type(5)
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
})

describe('Change default timeout in "BEFORE" Hook', function () {
    before(function () {
        Cypress.config('defaultCommandTimeout', 6000)
    })
    beforeEach(function () {
        cy.visit("https://play1.automationcamp.ir/expected_conditions.html")
        cy.get('#min_wait').clear().type(5)
        cy.get('#max_wait').clear().type(5)
    })
    it('Slow test 1', function () {
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
    it('Slow test 2', function () {
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
})

describe('Wait for a condition', function () {
    beforeEach(function () {
        cy.visit("https://play1.automationcamp.ir/expected_conditions.html")
        cy.get('#min_wait').clear().type(1)
        cy.get('#max_wait').clear().type(1)
    })
    it('Wait for alert to be present', function () {
        cy.window().then((win) => {
            cy.spy(win, 'alert').as('winAlert')
        })
        cy.get('#alert_trigger').click()
        cy.get('@winAlert').should('be.calledWith', 'I am alerting you!')
        cy.get("#alert_handled_badge")
    })
    it('Wait for element to be visible, then click on it', function () {
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible').click()
        cy.contains('I just removed my invisibility cloak!!')
    })
    it('Wait for element to be invisible', function () {
        cy.get('#invisibility_trigger').click()
        cy.get('#invisibility_target').should('not.be.visible')
    })
    it('Wait for element to be enabled / Wait for attribute', function () {
        cy.get('#enabled_target')
            .should('be.disabled')
            .should('have.class', 'btn btn-danger')
        cy.get('#enabled_trigger').click()
        cy.get('#enabled_target')
            .should('be.enabled')
            .should('have.class', 'btn btn-success')
            .click()
        cy.contains('See, you just clicked me!!')
    })
    it('Wait for Page Title to change', function () {
        cy.get('#page_title_trigger').click()
        cy.title().should('eq', 'My New Title!')
    })
    it('Wait for element to have specific text', function () {
        cy.get('#text_value_trigger').click()
        cy.get('#wait_for_value').should('have.value', 'Dennis Ritchie')
    })
    it('Wait for iframe to be available and then switch to it', { defaultCommandTimeout: 6000 }, function () {
        cy.get('#wait_for_frame').click()
        cy.frameLoaded("#frm")
        cy.iframe().find("#inner_button")
            .click()
            .should('have.text', 'Clicked')
    })
})

describe('Wait for page to be loaded', function() {
    before(() => {
        cy.log(`Page load timeout: ${Cypress.config('pageLoadTimeout')}`)
        Cypress.config('pageLoadTimeout', 50000)
    })
    it('Wait for page to be loaded', function () {
        cy.log(`Page load timeout: ${Cypress.config('pageLoadTimeout')}`)
        cy.visit('https://archive.org/details/audio_bookspoetry')
        cy.document({timeout: 10000}).its('readyState').should('eq', 'complete')
        cy.get('.projects').click()
        cy.location('pathname', {timeout: 10000}).should('eq', '/projects/')
    })
})

it('Call back on "should"', function () {
    cy.visit('https://play1.automationcamp.ir/forms.html')
    cy.get('select#select_lang>option').should((items)=>{
        expect(items).to.have.length(4)
        expect(items[0]).to.have.text('Java')
    })
})

it("Wait for Requests", () => {
    cy.intercept('POST', 'https://global.api.clockify.me/auth/token').as('reqAlias')
    cy.visit("https://app.clockify.me/en/login");            
    cy.get("#email").type("admin@automationcamp.ir")
    cy.get("#password").type("123456")
    cy.get("button[type=submit]").click()
    cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    cy.wait('@reqAlias')
    cy.get('@reqAlias').then((req) => {
        expect(req.request.body).to.have.ownProperty('password', '123456')
        expect(req.request.body).to.have.ownProperty('email', 'admin@automationcamp.ir')
        expect(req.response.statusCode).to.equal(200)
        expect(req.response.body).to.have.ownProperty('email', 'admin@automationcamp.ir')
        expect(req.response.body).to.have.ownProperty('token')
        expect(req.response.body).to.have.ownProperty('refreshToken')
        expect(req.response.body).to.have.ownProperty('id')
    })
})