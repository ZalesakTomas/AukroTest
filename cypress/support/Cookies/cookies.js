import {newsletter} from "../../Config/testedElements"

Cypress.Commands.add('getNewsletterCookie', () => {
    cy.getCookie(newsletter.newsletterCookie)
})
