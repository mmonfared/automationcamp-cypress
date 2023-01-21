/// <reference types = 'cypress' />

describe('Session 2', () => {
    it('1- Basic Syntax', () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get('#fname').type("Mohammad")
    })
    it("2- Auto Scroll", () => {
        cy.visit("https://datatables.net/examples/basic_init/scroll_x.html")
        cy.get(':nth-child(9) > :nth-child(9)').click()
    })
    it("3- Contains", () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.contains('This is your form title:')
        cy.contains("label[for='moption']", " Option 2")
        cy.get("label[for='moption']").contains(" Option 2")
    })
    it("4- Relatives", () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("#owc").children()
        cy.get("#owc").children("[value='option 2']").click()
        cy.contains("Singer").parent()
        cy.get("#owc").children("[value='option 2']").siblings().should('have.length', 2)
    })
    it("5- Ancestors", () => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page")
        cy.get("div#mp-welcome").parents()
        cy.get("div#mp-welcome").parents("div#mw-content-text")
        cy.get("div#mp-welcome").parentsUntil("#bodyContent")
    })
    it("6- Descendants", () => {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page")
        cy.get("#bodyContent").find("div#mw-content-text")
        cy.get("#bodyContent").within( () => {
            cy.get("div#mw-content-text")
        })
    })
    it("7- Index", () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("td").eq(5)
        cy.get("td").first()
        cy.get("td").last()
    })
    it("8- Filter", () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("td").filter("#td_id")
        cy.get("td").not("#td_id")
    })
    it("9- Traversal", () => {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("#fname").closest("div").should('have.class', 'main')
        cy.get("[value='td1_value']").next()
        cy.get("[value='td1_value']").nextAll()
        cy.get("[value='td1_value']").nextUntil("[value='td4_value']")
        cy.get("[value='td5_value']").prev()
        cy.get("[value='td5_value']").prevAll()
        cy.get("[value='td5_value']").prevUntil("[value='td1_value']")

    })
})