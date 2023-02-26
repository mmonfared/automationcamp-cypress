/// <reference types='cypress'/>

describe('Session21_DataDriven2_WorkWithFiles', function () {
    it.skip('1- Read File - txt', function () {
        cy.readFile('file1.txt').should('eq', 'This is a text file')
    })
    it('2- Write File - txt', function () {
        cy.writeFile('file1.txt', 'AutomationCamp')
        cy.readFile('file1.txt').should('eq', 'AutomationCamp')
    })
    it('3- Read File - json', function () {
        cy.readFile('cypress/fixtures/users.json').its('user1').its('firstName').should('eq', 'John')
        
    })
    it('4- Play MP3', function () {
        cy.readFile('file2.mp3', 'base64').then((mp3) => {
            const uri = 'data:audio/mp3;base64,' + mp3 
            const audio = new Audio(uri)
            audio.play()
        })
    })
    it('5- Read Excel', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')

        cy.task('parseXlsx', {filePath: 'cypress/fixtures/users.xlsx'})
        .then((jsonData) => {
            cy.get("#fname").type(jsonData[0].data[1][0])
            cy.get("#lname").type(jsonData[0].data[1][1])
            cy.get(`input#${jsonData[0].data[1][2]}`).click()
        })
    })

    it('6- Write to JSON', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')

        cy.task('parseXlsx', {filePath: 'cypress/fixtures/users.xlsx'})
        .then((jsonData) => {
            cy.writeFile("cypress/fixtures/users2.json", {
                user1: {name: jsonData[0].data[1][0], lastName: jsonData[0].data[1][1]}
            })
        })
    })
    it('7- Download by click', function () {
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#download_file').click()
        cy.verifyDownload('sample_text.txt')
        cy.readFile('cypress/downloads/sample_text.txt').should('include', 'by AutomationCamp')
    })
    it('8- Download by Link', function () {
        cy.downloadFile('https://www.play1.automationcamp.ir/sample_text.txt', 'cypress/downloads/MyDownloads', 'MyText.txt')
        cy.readFile('cypress/downloads/MyDownloads/MyText.txt').should('include', 'by AutomationCamp')
    })
    it('9- Upload single', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.get("#upload_cv").selectFile("cypress/fixtures/books.json")
        cy.get("#validate_cv").should('have.text',"books.json")
    })
    it('10- Upload Multiple', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.get("#upload_files").selectFile([
            "cypress/fixtures/books.json",
            "cypress/fixtures/data.json"
        ])
        cy.get("#validate_files").should('include.text', 'books.json')
        cy.get("#validate_files").should('include.text', 'data.json')
    })
    it('11- Upload with dragNdrop', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.get("#upload_cv").selectFile("cypress/fixtures/books.json", {action: 'drag-drop'})
        cy.get("#validate_cv").should('have.text',"books.json")
    })
    it('12- Upload with changing the file attributes', function () {
        cy.visit("https://www.play1.automationcamp.ir/forms.html")
        cy.get("#upload_cv").selectFile({
            contents: "cypress/fixtures/books.json",
            fileName: "automation.json",
            lastModified: new Date('Feb 12 2005').valueOf()
        })
        cy.get("#validate_cv").should('have.text',"automation.json")
    })
    it("13- Delete file", function() {
        cy.deleteFile("cypress/downloads/sample_text.txt")
    })
    it("14- Delete folder", function() {
        cy.deleteFolder("cypress/downloads/MyDownloads")
    })
    it("15- Delete folder", function() {
        cy.log('Deleting downloads folder...')
        cy.deleteDownloadsFolder()
    })
})