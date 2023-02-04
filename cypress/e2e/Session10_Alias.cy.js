/// <reference type='cypress'/ >
describe('session10-Aliases - 1- DOM elements', function () {
    it('1- DOM elements', function () {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("#lname").as('lastNameElement')
        cy.reload()
        cy.get('@lastNameElement').type('Monfared')
    });
});

describe('session10-Aliases - 2- Sharing Variables', function () {
    before(function (){
        cy.visit("https://www.play2.automationcamp.ir/index.html")
    })
    beforeEach(function (){
        cy.fixture('data.json').as('dataFile')
        cy.get("#lname").as('lastNameElement')
    })
    it('2- Sharing Variables-1', function () {
        cy.log(this.dataFile.email)
        cy.log(this.dataFile.password)
    });
    it('2- Sharing Variables-2', function () {
        cy.get('@lastNameElement').type("Monfared")
        cy.wrap(this.lastNameElement).clear().type("Monfared")
    });
});

describe('session10-Aliases - 3- Intercept()', function () {
    it('3- Intercept()', function () {
        cy.intercept('POST', '*/*google-analytics.com/**').as('GoogleAnalytics')
        cy.intercept('GET', '*/*.najva.com/**').as('NajvaCall')
        cy.visit("https://zoomit.ir")
        cy.wait('@GoogleAnalytics')
        cy.wait('@NajvaCall')
    });
});

describe('session10-Aliases - 4 - Request()', function () {
    it('4- Request()-1', function () {
        cy.request('GET', 'https://api.spacexdata.com/v3/missions').as('missions')
        cy.get('@missions').then(function (response){
            expect(response.status).to.equal(200)
        })
    });
    it('4- Request()-2', function () {
        cy.request('GET', 'https://api.spacexdata.com/v3/missions').then(function (missions){
            expect(missions.status).to.equal(200)
        }).as('response')
        cy.get('@response')
    });

});


