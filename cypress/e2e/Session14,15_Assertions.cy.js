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
    it('Get text - Implicit "have"', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.get('#check_python').click()
        cy.get('#check_validate').should('have.text', 'JAVA PYTHON')
    })
    it('Get text - Implicit "invoke"', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').invoke('text').should('eq', 'JAVA')
        cy.get('#check_python').click()
        cy.get('#check_validate').invoke('text').should('eq', 'JAVA PYTHON')
    })
    it('Get text - Explicit', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').then(function($el){
            let elementText = $el.text()
            expect(elementText.includes('JAVA')).to.be.true
        })
        
    })
    it('State - Checked | Unchecked', function (){
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        // Checkbox
        cy.get('#check_python').should('not.be.checked')
            .click().should('be.checked')
        //Radio button
        cy.get('#rad_selenium').should('not.be.checked')
        cy.get('#rad_protractor').should('not.be.checked')
            .click().should('be.checked')
        cy.get('#rad_selenium').should('not.be.checked')
            .click().should('be.checked')
        cy.get('#rad_protractor').should('not.be.checked')
        // Switch (Toggle)
        cy.get(".custom-control.custom-switch input").should('not.be.checked')
            .click({force: true})
        // cy.get(".custom-control.custom-switch").click()
        cy.get(".custom-control.custom-switch input").should('be.checked')

    })
    it('State - Enabled | Disabled', function (){        
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#salary').should('be.disabled')
        cy.get('#salary').invoke('removeAttr', 'disabled')
        cy.get('#salary').should('be.enabled')
    })
    it('Visibility', function (){        
        cy.visit('https://www.play1.automationcamp.ir/expected_conditions.html')
        cy.get('#max_wait').clear().type(2)
        cy.get('#visibility_target').should('not.be.visible')
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('be.visible')
    })
    it('Existance 1', function (){
        cy.visit('https://www.play1.automationcamp.ir/expected_conditions.html')
        cy.get('#max_wait').clear().type(2)
        cy.get('#visibility_target').should('exist')
        cy.get('#visibility_target').should('not.be.visible')
        cy.get('#visibility_trigger').click()
        cy.get('#visibility_target').should('exist')
        cy.get('#visibility_target').should('be.visible')
        
    })
    it('Existance 2', function (){
        cy.visit('https://material.angular.io/components/snack-bar/examples')
        cy.get('#mat-input-0').clear().type(2)
        cy.get('snack-bar-annotated-component-example.ng-star-inserted > .mdc-button > .mdc-button__label').click()
        cy.contains('Pizza party!!!').should('exist')
        cy.wait(2001)
        cy.contains('Pizza party!!!').should('not.exist')
        
    })
    it('Timeout option 1', function (){
        cy.visit('https://www.play1.automationcamp.ir/expected_conditions.html')
        cy.get('#max_wait').clear().type(5)
        cy.get('#max_wait').clear().type(7)
        cy.get('#visibility_target').should('not.be.visible')
        cy.get('#visibility_trigger').click()
        // cy.get('#visibility_target').should('be.visible')
        cy.get('#visibility_target', {timeout: 7000}).should('be.visible')
        
    })
    it('Timeout option 2', function (){
        cy.visit('https://material.angular.io/components/snack-bar/examples')
        cy.get('#mat-input-0').clear().type(5)
        cy.get('snack-bar-annotated-component-example.ng-star-inserted > .mdc-button > .mdc-button__label').click()
        // cy.contains('Pizza party!!!').should('not.exist')
        cy.contains('Pizza party!!!', {timeout:6000}).should('not.exist')
    })
    
})