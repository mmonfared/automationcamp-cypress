/// <reference types = "cypress"/>

describe('Session5', () => {
    it('1-Checkbox', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.get("#check_java").should("not.be.checked")
        cy.get("#check_java").check()
        cy.wait(500)
        cy.get("#check_java").should("be.checked")
        cy.get("#check_java").uncheck().should("not.be.checked")
    })
    it('2-Radio Button / 3-Switch', function () {
        // Radio Button
        cy.visit("https://material.angular.io/components/slide-toggle/examples")
        cy.get("#mat-radio-2-input").check({force: true}).should("be.checked")
        // Switch
        cy.get("#mat-slide-toggle-1-input").check({force: true}).should("be.checked")
    })
    it('4- Multiple Check()', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.wait(500)
        cy.get("input[type=checkbox]").check(['JAVA', 'PYTHON', 'JAVASCRIPT'])

    })
    it('5- Assert Enable/Disable', function () {
        cy.visit("https://material.angular.io/components/slide-toggle/examples")
        cy.get("#mat-slide-toggle-1-input").should('be.enabled')
        cy.get("#mat-checkbox-2-input").check({force: true})
        cy.get("#mat-slide-toggle-1-input").should('not.be.enabled')
    })
    it('6- Drop Down (Option Select)', function () {
        cy.visit("https://material.angular.io/components/select/overview#select-overview")
        // Native HTML select Tag
        cy.get("#mat-input-0").select("mercedes").should('have.value', 'mercedes')
        // Non-Select Tag
        cy.get("#mat-select-0").click()
        cy.get("#mat-option-1").click()

    })
    it('7- Drop Down (Chips)', function () {
        cy.visit("https://material.angular.io/components/chips/examples")
        cy.get("#mat-chip-list-input-0").click()
        cy.get("#mat-option-3").click()
        cy.get("#mat-chip-list-0").within( function () {
            cy.contains("Orange")
        })
    })

})