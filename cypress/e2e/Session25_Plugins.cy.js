/// <reference types='cypress'/>

// https://docs.cypress.io/plugins

describe('Session 25 - Useful Plugins', () => {
    // https://github.com/cypress-io/cypress/tree/develop/npm/xpath
    it('cypress-xpath', () => {
        cy.visit('http://play2.automationcamp.ir/index.html')
        cy.xpath("//input[@id='fname']").type('Mohammad')
        cy.xpath("//input[@id='lname']").type('Monfared')
        cy.xpath("//*[@id='td_id']/following-sibling::*[3]").should('have.text', 'Actor')
        
    })
    // https://github.com/MohamadKh75/cypress-plugin-multiple-click
    it('cypress-plugin-multiple-click', () => {
        cy.visit('multiple-clicks.html')
        cy.get('#count').should('have.text', 0).as('count');
        cy.get('#increase').clicks(3);
        cy.get('@count').should('have.text', 3);
    })
    // https://testing-library.com/docs/cypress-testing-library/intro/
    it('cypress-testing-library', () => {
        cy.visit('http://play1.automationcamp.ir/forms.html')
        cy.findByPlaceholderText('years of automation experience').type(8)
        cy.findByLabelText('Speaks German?').click({force: true})
        
    })
    it('cypress-plugin-api', () => {
        // https://github.com/filiphric/cypress-plugin-api

        // cy.request('https://restcountries.com/v3.1/name/germany').then(($response) => {
        cy.api('https://restcountries.com/v3.1/name/germany').then(($response) => {
            expect($response.status).to.eq(200)
            expect($response.body[0].capital[0]).eq('Berlin')
        })
    })
    // https://github.com/dmtrKovalenko/cypress-real-events
    it('cypress-real-events', () => {
        // Session 3
    })
    // https://github.com/flotwig/cypress-log-to-output
    it('cypress-log-to-output', () => {
        // Session 23
    })
    // https://gitlab.com/kgroat/cypress-iframe
    it('cypress-iframe', () => {
        // Session 16
    })
    // cypress-plugin-steps: https://github.com/filiphric/cypress-plugin-steps
    // cucumber: https://github.com/badeball/cypress-cucumber-preprocessor
})