/// <reference types='cypress'/>

describe('Session20_DataDriven1_Fixtures', function () {
    beforeEach( function () {
        cy.fixture('users.json').as('usersData')
        cy.fixture('books.json').as('booksData')
    })

    it('User 1 Fixture', function () {
        cy.log(JSON.stringify(this.usersData))
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.get("#fname").type(this.usersData.user1.firstName)
        cy.get("#lname").type(this.usersData["user1"]["lastName"])
        cy.get(`input#${this.usersData["user1"]["gender"]}`)
    })
    it('User 2 Fixture', function () {
        cy.log(JSON.stringify(this.usersData))
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.get("#fname").type(this.usersData.user2.firstName)
        cy.get("#lname").type(this.usersData["user2"]["lastName"])
        cy.get(`input#${this.usersData["user2"]["gender"]}`)

    })
    it("Intercept with Fixture", () => {
        cy.intercept('https://api.realworld.io/api/tags', 
            {fixture:'tags.json'}).as('reqAlias')
        cy.visit("https://angular.realworld.io/")
        cy.wait('@reqAlias')
        cy.get('@reqAlias').then((req) => {
            expect(req.response.body).to.eql({"tags":["AutomationCamp", "Cypress"]})
        })
        cy.get('.tag-list > a').contains('AutomationCamp')
      });
    
    it("Buy products", function() {
        cy.visit('https://demo.nopcommerce.com/books')
        this.booksData.bookForTest.forEach(function (element) {
            cy.addProduct(element)
            cy.wait(2000)
        })
        cy.visit('https://demo.nopcommerce.com/cart')
        cy.get('.product-name').should('have.length', 2)
        .each(function($el, index, list){
            expect(this.booksData.bookForTest.includes($el.text()))
        } )
      })

})
