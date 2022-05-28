/// <reference types = 'cypress' />

describe('Session 7', function () {
    it('Multiple elements', function () {
        cy.visit("https://www.wikipedia.org/")
        cy.get("a[id*='js-link-box']").should('have.length', 10)
        cy.get("a[id*='js-link-box']").should('contain.text', 'فارسی')
        cy.get("a[id*='js-link-box']").should('contain.text', 'فار')
        // cy.get("a[id*='js-link-box']").eq(0).click()
        // cy.get("a[id*='js-link-box']").eq(-2).click()
        // cy.get("a[id*='js-link-box']").first()
        cy.get("a[id*='js-link-box']").last().click()
    });
    it('Introduce each()', function () {
        cy.visit("https://www.wikipedia.org/")
        cy.get("a[id*='js-link-box']>strong").each(function ($el,index, $listOfElements) {
            // cy.log($el.text())
            // cy.log(index)
            // cy.log($listOfElements.length)
            // if (index === 6) {
            //     cy.log($el.text())
            //     $el.trigger('click')
            // }
            if ($el.text().includes('Fran')) {
                $el.click()
            }
        })
    });
    it('Web Table 1', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.scrollTo('bottom')
        cy.get('tr').then(function ($list) {
            cy.log($list.length)
        })
        cy.get('tr').should('have.length', 7)
        cy.get('table th').eq(1).should('have.text', 'Lastname')
        cy.get('table th:eq(1)').should('have.text', 'Lastname')
        // 1
        cy.get('tbody>tr:eq(2)>td:eq(0)').then(function ($el) {
            expect($el.text()).eq('Pheobe')
        })
        // 2
        cy.get('tbody>tr').eq(2).within(function (){
            cy.get('td:first-child').should('have.text', 'Pheobe')
            cy.get('td:eq(0)').should('have.text', 'Pheobe')
            cy.get('td').eq(0).should('have.text', 'Pheobe')
            cy.get('td').first().should('have.text', 'Pheobe')
        })
    })
    it('Web Table 2: Get specific cell value based on another cell value', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.scrollTo('bottom')
        // When we know about the index of Occupation
        cy.get('table').contains('Smith').parent().within(function () {
            cy.get('td').eq(4).should('have.text', 'Actor')
        })
        // When we don't know about the index of Occupation
        cy.get('tbody th').each(function ($el, index) {
            if ($el.text() === 'Occupation') {
                cy.get('table').contains('Smith').parent().within(function () {
                    cy.get('td').eq(index).should('have.text', 'Actor')
                })
            }
        })
    });
    it('Introduce wrap()', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.scrollTo('bottom')
        cy.get('tr').each(function ($row, index, $list) {
            if (index > 0) {
                cy.wrap($row).within(function () {
                    cy.get('td').each(function ($cellData, cellIndex, $cellList) {
                        cy.log($cellData.text())
                    })
                })
            }

        })
    });
    it('Web Table 2: Using array', function () {
        cy.visit('https://www.play2.automationcamp.ir/index.html')
        cy.scrollTo('bottom')
        let list = []
        cy.get('tbody th').each(function ($el, index) {
            if ($el.text() === 'Firstname') {
                cy.get(`tr>td:nth-child(${index+1})`).each(function ($td) {
                    list.push($td.text())
                })
            }
        }).then(function (){
            cy.log(JSON.stringify(list))
            expect(list).to.contains('Richard')
        })

    });
});