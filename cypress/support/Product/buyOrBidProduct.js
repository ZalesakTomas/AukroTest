import faker from "faker"
import {checkIfElementExists} from "../Functions/element"
import {auctionPath} from "../../Config/paths"
import {product} from "../../Config/testedElements"
import {regex} from "../../Config/regex"

const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('isAuction', () => {
    // Assert that product have bidding button without test fail

    checkIfElementExists(product.bidButton)
        .then(() => {
            cy.log('Bidding button exist')
            return cy.wrap(2)
        })
        .catch(() => {
            cy.log('Bidding button does not exist')
            return cy.wrap(0)
        })
})

Cypress.Commands.add('isBuyNow', () => {
    // Assert that product have buy now button without test fail

    checkIfElementExists(product.buyButton)
        .then(() => {
            cy.log('Buy now button exist')
            return cy.wrap(1)
        })
        .catch(() => {
            cy.log('Buy now button does not exist')
            return cy.wrap(0)
        })
})

Cypress.Commands.add('buyOrBidToProduct', () => {
    // Decide what will be tested, buy now or bidding functionality. If product have both options, then next action will be selected by random.

    let buyOrBid = 0
    cy.isAuction().then((isAuction) => {
        buyOrBid += isAuction
        cy.isBuyNow().then((isBuyNow) => {
            buyOrBid += isBuyNow
            cy.log(buyOrBid)
            switch (buyOrBid) {
                case 3:
                    let randomNumber = faker.random.number(1000)
                    cy.log('Current product have buy and bid options.')
                    if (randomNumber <= 500)
                        cy.bidProduct()
                    if (randomNumber > 500)
                        cy.buyProduct()
                    break
                case 2:
                    cy.log('Current product is auction')
                        .bidProduct()
                    break
                case 1:
                    cy.log('Current product is buy now')
                        .buyProduct()
                    break
                default:
                    throw new Error('This product haven\'t any buy or bid option.')
            }
        })
    })
})

Cypress.Commands.add('buyProduct', () => {
    /*
    Buy product by clicking on buy now button and assert in mini cart that there is one product now.
    As workaround for SSR page, there are api requests for adding product to cart and for checking that product is in cart.
     */

    cy.getProductId()
        .then((productId) => {
            cy.get(product.buyButton)
                .click()
                .request({
                    method: 'POST',
                    url: 'https://aukro.cz/backend/api/cart/item',
                    body: {
                        item: {
                            itemId: productId,
                            itemQuantity: 1
                        },
                        update: false
                    }
                })
                .request({
                    method: 'get',
                    url: 'https://aukro.cz/backend/api/cart'
                })
                .then((request) => {
                    cy.wrap(request)
                        .its('body')
                        .its('cartItems')
                        .each((cartItems) => {
                            expect(cartItems.itemId.toString()).equal(productId)
                        })
                })
        })
        /*
        This could be assertion if we didn't use api
        .get('basket-control > span[data-control]')
        .should('equal',1)
         */

        .log('Product was added to cart')
})

Cypress.Commands.add('bidProduct', () => {
    /*
    Bid to product with bid 20% higher than suggested bid in input and assert that we are redirected to login page.
    Workaround for SSR version - construct url in correct format for login page where is user redirected after bid and go there
     */

    cy.location().its('pathname').then((productPath) => {
        let cleanProductPath = productPath.replace(regex.removeFirstCharacter, '')
        let loginPageUrl = new URL(auctionPath.loginPathWithParameter + cleanProductPath + auctionPath.confirmSuffix, baseUrl)

        cy.get(product.priceInput)
            .find(product.inputTypeNumber)
            .as('priceInput')
            .invoke('val')
            .then((currentPrice) => {
                let newPrice = currentPrice * product.priceModifier

                cy.get('@priceInput')
                    .clear()
                    .type(newPrice)
                    .get(product.bidButton)
                    .click()
                    .log('Product had price ' + currentPrice + " Kč, bid is " + newPrice + " Kč.")
                    .visit(loginPageUrl.href)
                    .get('login')
            })
    })
})
