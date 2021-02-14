import {badgeSelector, category} from "../../Config/testedElements"

Cypress.Commands.add('checkFilterSafeAukroPayment', () => {
    // Get checkbox of filter Payment via Aukro and check it

    cy.get(category.filterCheckbox)
        .find(badgeSelector.paymentViaAukroBadge)
        .parent()
        .siblings('div')
        .find('input')
        .check({force: true})
})
