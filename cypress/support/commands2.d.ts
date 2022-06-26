/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable {
        openLinkWithTextCommand2(linkName: string): Cypress.Chainable
    }
}