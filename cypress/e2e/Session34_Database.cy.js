/// <reference types='cypress'/>

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
// flush privileges;

describe("Session34-Database", () => {
    it('01-Create table', function (){
        cy.task('queryDb', 'create table ac.Users (userId int, userName varchar(255), email varchar(255), city varchar(255))')
    })
    it('02-Insert & Select record', function (){
        // cy.task('queryDb', "insert into ac.Users(userId, userName, email, city) values (2, 'reza', 'reza@test.com', 'Shiraz');")
        cy.task('queryDb', "select * from ac.Users").then(res => {
            cy.log(res)
            expect(res[0].userName).to.equal('reza')
        })
    })
    // it('03-Update record', function (){

    // })
    // it('04-Delete record', function (){

    // })
})

describe.only("Session34-Database", () => {
    // let user = x
    before(function (){
        cy.task('queryDb', "insert into ac.Users(userId, userName, email, city) values (3, 'admin', 'admin@test.com', 'Ahvaz');")
    })
    it('Test case 1', function (){
        cy.visit('https://play1.automationcamp.ir/login.html')
        cy.task('queryDb', "select * from ac.Users").then(res => {
            cy.get("#user").type(res[res.length-1].userName)
            cy.get("#password").type(res.at(-1).userName)
        })
        cy.get("#login").click()
        cy.get("#submit_button").should('be.visible')
    })
    after(function (){
        cy.task('queryDb', "delete from ac.Users where userName = 'admin';")
    })
})