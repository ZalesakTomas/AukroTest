import {product} from "../../Config/testedElements"
import {regex} from "../../Config/regex"

Cypress.Commands.add('productTitleHave', (testedElement) => {
    // Assert that product title have tested element

    cy.get(product.productTitle)
        .find(testedElement)
        .should('be.visible')
        .log('Title have tested element')
})

Cypress.Commands.add('productDeliveryInfoHave', (testedElement) => {
    // Assert that product delivery info have tested element

    cy.get(product.deliveryInfo)
        .find(testedElement)
        .should('be.visible')
        .log('Delivery info have tested element')
})


Cypress.Commands.add('getProductId', () => {
    // Get product id from text

    cy.get(product.productId)
        .invoke('text')
        .then((productId) => {
            let productIdNumber = productId.replace(regex.extractNumbers, '')

            cy.log('Product ID is: ' + productIdNumber)
            return cy.wrap(productIdNumber)
        })
})
