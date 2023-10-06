describe("Login admin page", () => {
  it("Should show login-admin page and test it", () => {
    cy.visit("http://localhost:3000/login-admin");

    // form admin
    cy.get(`[data-cy="login-admin-form"]`).should("be.visible");

    cy.get(`[data-cy="login-admin-logo"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-title"]`).should("be.visible");

    // input username
    cy.get(`[data-cy="login-admin-input-username"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-input-username"]`).type("pak_dengklek", {
      delay: 50,
    });

    /// input password
    cy.get(`[data-cy="login-admin-input-password"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-input-password"]`).type("102938", {
      delay: 50,
    });

    // submit button
    cy.get(`[data-cy="login-admin-submit-button"]`).should("be.visible");
    cy.get(`[data-cy="login-admin-submit-button"]`).click("center");
  });
});
