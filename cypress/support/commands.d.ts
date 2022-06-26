/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Open any link using its text
         @param {string} linkName - text of the `a` tag of the link
         @example
         cy.openLinkWithText('Terms & Conditions')
         */
        openLinkWithText(linkName: string): Cypress.Chainable

        /**
         *
         * @param element
         */
        getText(element: Element): Cypress.Chainable
        getTextOptional(element: Element): Cypress.Chainable
    }
}

