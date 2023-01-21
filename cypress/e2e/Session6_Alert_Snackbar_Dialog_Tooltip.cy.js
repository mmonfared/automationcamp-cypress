/// <reference types = "cypress"/>

describe('Session 6', function () {
    it('1- Alerts - Alert', function () {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.contains('Click for JS Alert').click()
        cy.on('window:alert', function (message) {
            expect (message).eq('I am a JS Alert')
        })
    });

    it('2-1 Alerts - Confirm - Accept', function () {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.contains('Click for JS Confirm').click()
        cy.on('window:confirm', function (message) {
            expect (message).eq('I am a JS Confirm')
        })
        cy.get("#result").should('have.text', 'You clicked: Ok')
        cy.get("#result").invoke('text').should('equal', 'You clicked: Ok')
    });

    it('2-2 Alerts - Confirm - Dismiss', function () {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.contains('Click for JS Confirm').click()
        cy.on('window:confirm', function (message) {
            expect (message).eq('I am a JS Confirm')
            return false
        })
        cy.get("#result").should('have.text', 'You clicked: Cancel')
        cy.get("#result").invoke('text').should('equal', 'You clicked: Cancel')
    });

    it('3- Alerts - Prompt', function () {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.window().then(function ($win) {
            cy.contains('Click for JS Prompt').click()
            cy.stub($win, 'prompt').returns("AutomationCamp-cypress")
        })
        cy.get("#result").should('have.text', 'You entered: AutomationCamp-cypress')
        cy.get("#result").invoke('text').should('equal', 'You entered: AutomationCamp-cypress')
    });

    it('4- Dialog ', function () {
        cy.visit('https://material.angular.io/components/dialog/examples')
        cy.get('.mat-primary > .mat-button-wrapper').click()
        cy.get('.docs-navbar-header > [href="/cdk"] > .mat-button-wrapper').then(function (cdk) {
            cy.get('#dialog-data > .docs-example-viewer-wrapper > .docs-example-viewer-body >' +
                ' .ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper').click()
            cy.wait(1000)
            let rect = cdk[0].getBoundingClientRect()
            cy.document().then(function (doc) {
                doc.elementFromPoint(rect.x, rect.y).click()
            })
        })
    });

    it('5-Snackbar (Toast Message) - By Text', function () {
        cy.visit('https://material.angular.io/components/snack-bar/examples')
        cy.get('.mat-primary > .mat-button-wrapper').click()
        cy.get('#mat-input-0').clear().type(1)
        cy.get('snack-bar-component-example.ng-star-inserted > .mat-focus-indicator').click()
        cy.get(".cdk-global-overlay-wrapper").within(function () {
            cy.contains("Pizza party")
        })
    });

    it('6-Snackbar (Toast Message) - By Selector', function () {
        cy.visit('https://material.angular.io/components/snack-bar/examples')
        cy.get('.mat-primary > .mat-button-wrapper').click()
        cy.get('#mat-input-0').clear().type(1)
        cy.get('snack-bar-component-example.ng-star-inserted > .mat-focus-indicator').click()
        cy.get(".example-pizza-party").should('exist')
    });

    it('7- Tooltip message', function () {
        cy.visit('https://material.angular.io/components/tooltip/examples#tooltip-message')
        cy.get('#mat-input-2').clear().type('AutomationCamp Tooltip')
        cy.get('tooltip-message-example.ng-star-inserted > .mat-focus-indicator').realHover()
        cy.get('.cdk-overlay-container').last().within( function () {
            cy.contains('AutomationCamp Tooltip')
        })
    });
});