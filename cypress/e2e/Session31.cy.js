/// <reference types='cypress'/>

describe("Session31", () => {
    it('01-Passing test', function (){
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#notes').type('Automation Camp').should('have.value', 'Automation Camp')
    })
    it('02-Failing test', function (){
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#notes').type('Automation Camp').should('have.value', 'AutomationCamp')
      })
})