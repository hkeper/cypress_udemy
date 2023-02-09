///<reference types="Cypress"/>

describe('First Suite', () => {
    
    it("test1", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type("ca")
        //cy.get("[class='product']").should("have.length", 4)

        cy.get('.products').as('prs')
        cy.get(".product:visible").should("have.length", 4)
        cy.get('@prs').find('.product').eq(1).contains('ADD TO CART').click()

        cy.get('@prs')
            .find('.product')
            .each(($el, index, $list) => 
            {
                let prodName = $el.find('h4[class="product-name"]').text()
                if(prodName.includes("Cashews")) {
                    cy.wrap($el).find('button').click()
                }
            })
        
        cy.get('.brand').should("have.text", "GREENKART")

        cy.get('.brand').then((logo) => {
            cy.log(logo.text())
        })    

    })

});

