/// <reference types="Cypress" />

describe('Session14 - Assertions', function (){
    it('Attributes - Get Link', function (){
        cy.visit("https://wikipedia.com")
        cy.get("#js-link-box-it").invoke('attr', 'href').should('eq', '//it.wikipedia.org/')
    })
    it('Attributes - Get Value (input)', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#notes').type('Automation Camp').should('have.value', 'Automation Camp')
    })
    it('Attributes - Validate in-line errors', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('button[type=submit]').click()
        cy.contains('Please provide a valid state.')
        cy.get('.card-body form.needs-validation').invoke('attr', 'class').should('include', 'was-validated')

    })
    it.only('Get text - Implicit "have"', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.get('#check_python').click()
        cy.get('#check_validate').should('have.text', 'JAVA PYTHON')
    })
    it.only('Get text - Implicit "invoke"', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').invoke('text').should('eq', 'JAVA')
        cy.get('#check_python').click()
        cy.get('#check_validate').invoke('text').should('eq', 'JAVA PYTHON')
    })
    it.only('Get text - Explicit', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').then(function($el){
            let elementText = $el.text()
            expect(elementText.includes('JAVA')).to.be.true
        })
        
    })
    it('State - Checked | Unchecked', function (){
        // Radio button | switch | checkbox

    })
    it('State - Enabled | Disabled', function (){        

    })
    it('Visibility', function (){        

    })
    it('Existance', function (){
        
    })
    it('Timeout option', function (){
        
    })
    
})