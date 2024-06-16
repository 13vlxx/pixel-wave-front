import { CypressData } from "../data/data";

describe("Profile", () => {
  Cypress.on("uncaught:exception", () => false);

  it("Should update profile", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/register").as("register");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get('[data-cy="register"]').click();
    cy.get("input[name='pseudo']").clear().type(CypressData.new_pseudo);
    cy.get("input[name='email']").clear().type(CypressData.new_email);
    cy.get("input[name='password']").clear().type(CypressData.new_password);
    cy.get("button[type='submit']").click();
    cy.wait("@register").its("response.statusCode").should("eq", 201);
    cy.wait(2000);
    cy.get("[data-cy=profile]").click();
    cy.get("button").contains("Règlages").click();
    cy.get("p").contains("Modifier").click();
    cy.get("input[placeholder='Nouveau mot de passe']").clear().type("Test1234**");
    cy.get("input[type='checkbox']").click();
    cy.get("button").contains("Confirmer").click();
    cy.wait(2000);
    cy.visit("/staff-request");
    cy.scrollTo("bottom");
    cy.get("button[data-cy=submit]").click({ force: true });
  });
});
