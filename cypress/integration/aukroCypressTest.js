import {paymentViaAukroQueryString} from '../Config/paths.js'
import {badgeSelector} from '../Config/testedElements.js'

describe('Aukro - Senior QA Specialista', () => {
    it('test A', () => {
        cy.visit('/')
            .handleNewsletterModal()
            .getAllTopLevelCategoriesPath()
            .each((categoryUrl) => {
                cy.visit(categoryUrl.href)
                    .handleNewsletterModal()
                    .checkFilterSafeAukroPayment()
                    // Workaround - on SSR page filters doesn't work. This workaround simulate successful check of payment via Aukro Angular checkbox

                    .visit(categoryUrl.href + paymentViaAukroQueryString)
                    // End of workaround

                    .getNumberOfListCards()
                    .then((numberOfListCards) => {
                        // If there is 5 or more list cards, test will continue

                        if (numberOfListCards > 4) {
                            cy.log('In this category is five or more list cards, on this page is ' + numberOfListCards + ' list cards.')
                                .everyListCardHas(badgeSelector.paymentViaAukroBadge)
                                .selectListCard(numberOfListCards)
                                .productTitleHave(badgeSelector.paymentViaAukroBadge)
                                .productDeliveryInfoHave(badgeSelector.paymentViaAukroBadge)
                                .buyOrBidToProduct()
                        }
                        if (numberOfListCards <= 4)
                            cy.log('This category have not enough of list card, test will continue to next category.')
                    })

            })
        cy.log('Test finished succesfully')
    })
})
