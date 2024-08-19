import { CypressData } from "../data/data";

describe("Auth", () => {
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  it("should register", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/register").as("register");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get('[data-cy="register"]').click();
    cy.get("input[name='pseudo']").clear().type(CypressData.new_pseudo);
    cy.get("input[name='email']").clear().type(CypressData.new_email);
    cy.get("input[name='password']").clear().type(CypressData.new_password);
    cy.get("button[type='submit']").click();
    cy.wait("@register").its("response.statusCode").should("eq", 201);
    cy.wait(3000);
  });

  it("should not register", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/register").as("register");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get('[data-cy="register"]').click();
    cy.get("input[name='pseudo']").clear().type("admin");
    cy.get("input[name='email']").clear().type(CypressData.email);
    cy.get("input[name='password']").clear().type(CypressData.password);
    cy.get("button[type='submit']").click();
    cy.wait("@register").its("response.statusCode").should("eq", 409);
    cy.wait(3000);
  });

  it("should login & logout", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/login").as("login");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get("input[name='email']").clear().type(CypressData.email);
    cy.get("input[name='password']").clear().type(CypressData.password);
    cy.get("button[type='submit']").click();
    cy.wait("@login").its("response.statusCode").should("eq", 201);
    cy.wait(3000);

    cy.get("[data-cy=profile]").click();
    cy.wait(1000);
    cy.get('[data-cy="logout"]').click();
    cy.wait(1000);
    cy.get("[data-button]").click();
    cy.wait(3000);
  });

  it("should not login", () => {
    cy.intercept("POST", "http://localhost:3000/api/auth/login").as("login");

    cy.visit("/");
    cy.get("[data-cy=auth-modal]").click();
    cy.get("input[name='email']").clear().type(CypressData.email);
    cy.get("input[name='password']").clear().type(CypressData.new_password);
    cy.get("button[type='submit']").click();
    cy.wait("@login").its("response.statusCode").should("eq", 409);
    cy.wait(3000);
  });
});
