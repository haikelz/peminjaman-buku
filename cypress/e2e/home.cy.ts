describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get(`[data-cy="login-title"]`).should("be.visible");
    cy.get(`[data-cy="login-logo"]`).should("be.visible");

    // sign in button
    cy.get(`[data-cy="sign-in-with-github-button"]`).should("be.visible");
    cy.get(`[data-cy="sign-in-with-google-button"]`).should("be.visible");

    cy.get(`[data-cy="login-admin-link"]`).should("be.visible");
  });
});
