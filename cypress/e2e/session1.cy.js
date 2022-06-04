/// <reference types = "cypress"/>

describe('Suite 1', () => {
    it('1- Google Search', function () {
        cy.visit("https://google.com")
        cy.get("input[name=q]").type("Cypress{enter}")
    })

    it('2- Cypress Website', () => {
        cy.visit("https://cypress.io")
        cy.title().should('eq', "JavaScript End to End Testing Framework | cypress.io testing tools")
        cy.title().should('include', 'End to End Testing Framework')
    })
})