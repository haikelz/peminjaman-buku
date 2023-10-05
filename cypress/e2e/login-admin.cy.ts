describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get(`[data-cy="login-admin-form"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-logo"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-title"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-input-username"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-input-password"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-submit-button"]`).should("be.visible");
  });
});
