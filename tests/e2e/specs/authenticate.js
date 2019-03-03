/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// https://docs.cypress.io/api/introduction/api.html

describe('Login Page test', () => {
  it('Visits the url and confirms button is disabled', () => {
    cy.visit('/');
    cy.get('form').within(() => {
      cy.get('.link').click();
      cy.url().should('include', '/forgot-password');
    });
  });
});
