/// <reference types='cypress'/>

describe('Session19 - Spy/Stub', () => {
    beforeEach( () => {
        cy.visit('spy-stub.html')
    })
    it('1- Spy', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog')
        })
        cy.get('#console-log').click()
        cy.get('#console-log').click()
        cy.get('@consoleLog').should('be.calledWith', 'Hello World!')
        cy.get('@consoleLog').should('be.calledTwice')
        
    })

    it('2- Stub-window.print()', () => {
        cy.window().then((win) => {
            cy.stub(win, 'print').as('winPrint')
        })
        cy.get('#print-window').click()
        cy.get('@winPrint').should('be.called')
        cy.get('#console-log').click()
    })

    it('3- Stub-window.open()', () => {
        cy.window().then((win) => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#open-window').click()
        cy.get('@winOpen').should('be.calledWith', 'https://google.com')
        cy.get('#console-log').click()
    })
    
    it('4- Stub-Alert', function () {
        cy.window().then( (win) => {
           cy.stub(win, 'alert').as('winAlert')
        })
        cy.get('#alert').click()
        cy.get('@winAlert').should('be.calledWith', 'I am a JS Alert')
        
    })
    it('5- Stub-Confirm-Accept', function () {
        cy.window().then( (win) => {
           cy.stub(win, 'confirm').returns(true).as('winConfirm')
        })
        cy.get('#confirm').click()
        cy.get('@winConfirm').should('be.calledWith', 'I am a JS Confirm')
        cy.get('#result').should('have.text', 'You clicked: Ok')
        
    })
    it('5- Stub-Confirm-Cancel', function () {
        cy.window().then( (win) => {
           cy.stub(win, 'confirm').returns(false).as('winConfirm')
        })
        cy.get('#confirm').click()
        cy.get('@winConfirm').should('be.calledWith', 'I am a JS Confirm')
        cy.get('#result').should('have.text', 'You clicked: Cancel')
        
    })
    it('6- Stub-Prompt', function () {
        cy.window().then( (win) => {
           cy.stub(win, 'prompt').returns('My prompt message').as('winPrompt')
        })
        cy.get('#prompt').click()
        cy.get('@winPrompt').should('be.calledWith', 'I am a JS Prompt')
        cy.get('@winPrompt').should('have.returned', 'My prompt message')
        cy.get('#result').should('have.text', 'You entered: My prompt message')
    })

})

describe('Session19-Intercept/Mock', () => {
    it("Intercept (Spy network)", () => {
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
    it("Mock (Stub network)", () => {
        cy.intercept('https://api.realworld.io/api/tags', 
            {"tags":["AutomationCamp", "Cypress"]}).as('reqAlias')
        cy.visit("https://angular.realworld.io/")
        cy.wait('@reqAlias')
        cy.get('@reqAlias').then((req) => {
            expect(req.response.body).to.eql({"tags":["AutomationCamp", "Cypress"]})
        })
        cy.get('.tag-list > a').contains('AutomationCamp')
      });
})