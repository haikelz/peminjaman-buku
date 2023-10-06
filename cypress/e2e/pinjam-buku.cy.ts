describe("Pinjam buku page", () => {
  it("Should display pinjam buku page and test it", () => {
    cy.visit("http://localhost:3000/dashboard/pinjam-buku");

    cy.get(`[data-cy="sidebar"]`).should("be.visible");
    cy.get(`[data-cy="header"]`).should("be.visible");

    cy.get(`[data-cy="dark-mode-switcher"]`).should("be.visible");
    cy.get(`[data-cy="dark-mode-switcher"]`).click("center");

    // table
    cy.get(`[data-cy="table-data"]`).should("be.visible");

    // delete button
    cy.get(`[data-cy="delete-button"]`).should("be.visible");
    cy.get(`[data-cy="delete-button"]`).click("center");

    // pinjam buku button
    cy.get(`[data-cy="pinjam-buku-button"]`).should("be.visible");
    cy.get(`[data-cy="pinjam-buku-button"]`).click("center");
  });
});
