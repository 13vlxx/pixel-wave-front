describe("Auth", () => {
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  it("should visit the first game and publish an advice", () => {
    cy.visit("/");
    cy.get("#game-0").click();
    cy.get('[data-cy="advice"]').click();
    cy.get("button").contains("Se connecter").click();
    cy.wait(2000);
    cy.get("[data-cy=advice").click();
    cy.wait(1000);
    cy.get("[data-cy=advice-area]").clear().type("This is a test advice");
    cy.wait(1000);
    cy.get("[data-cy=advice-submit]").click();
    cy.wait(3000);
  });

  it("should visit the first game and toggle favorite", () => {
    cy.visit("/");
    cy.get("#game-0").click();
    cy.get('[data-cy="heart"]').click();
    cy.get("button").contains("Se connecter").click();
    cy.wait(2000);
    cy.get('[data-cy="heart"]').click();
    cy.wait(1000);
    cy.get('[data-cy="heart"]').click();
    cy.wait(3000);
  });
});
