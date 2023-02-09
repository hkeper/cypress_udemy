///<reference types="Cypress"/>

describe('First Suite', () => {
    
    it("test1", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type("ca")
        //cy.get("[class='product']").should("have.length", 4)

        cy.get('.products').as('prs')

        cy.get('@prs')
            .find('.product')
            .each(($el, index, $list) => 
            {
                let prodName = $el.find('h4[class="product-name"]').text()
                if(prodName.includes("Cashews")) {
                    cy.wrap($el).find('button').click()
                }
            })
        cy.get('.cart-icon > img').click()    
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()

    })

});

