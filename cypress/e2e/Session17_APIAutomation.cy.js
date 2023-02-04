/// <reference types="Cypress" />

describe('Session17_ApiAutomation', () => {
    it('SimpleRequests', () => {
        cy.request('https://restcountries.com/v3.1/name/germany').then(($response) => {
            expect($response.status).to.eq(200)
            expect($response.body[0].capital[0]).eq('Berlin')
        })
        })
    it('API-Chaining', function (){
        cy.request('https://restcountries.com/v3.1/name/australia').then(($response) => {
            expect($response.status).to.eq(200)
            let countryCurrencyKey = Object.keys($response.body[0]["currencies"])
            cy.request("POST", "http://localhost:3000/countries", {
                name: "Australia",
                capital: $response.body[0].capital[0],
                currency: countryCurrencyKey[0]
            })
            cy.request("GET", "http://localhost:3000/countries").then(($resp) => {
                let result = {}
                $resp.body.forEach(item => { 
                    if (item.name="Australia") {
                        result=item
                    }
                });
                expect(result).to.not.empty
                expect(result.capital).to.eq('Canberra')
                expect(result.currency).to.eq('AUD')
            })
        })
    })
    
})