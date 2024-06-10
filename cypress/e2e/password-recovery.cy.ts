import { CypressData } from "../data/data";

describe("Password recovery", () => {
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  it("should send recovery email", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/forgot-password").as("recover");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get('[data-cy="forgotten-password"]').click();
    cy.get("input[name='email']").clear().type(CypressData.email);
    cy.get(".btn").click();
    cy.wait("@recover").its("response.statusCode").should("eq", 204);
    cy.wait(3000);
  });

  it("should not send recovery email", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/forgot-password").as("recover");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get('[data-cy="forgotten-password"]').click();
    cy.get("input[name='email']").clear().type(CypressData.email);
    cy.get(".btn").click();
    cy.wait("@recover").its("response.statusCode").should("eq", 409);
  });
});
