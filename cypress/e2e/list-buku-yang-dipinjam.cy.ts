describe("List buku yang dipinjam page", () => {
  it("Should display list buku yang dipinjam page and test it", () => {
    cy.visit("http://localhost:3000/dashboard/list-buku-yang-dipinjam");

    cy.get(`[data-cy="sidebar"]`).should("be.visible");
    cy.get(`[data-cy="header"]`).should("be.visible");

    cy.get(`[data-cy="dark-mode-switcher"]`).should("be.visible");
    cy.get(`[data-cy="dark-mode-switcher"]`).click("center");

    cy.get(`[data-cy="table-data"]`).should("be.visible");

    cy.get(`[data-cy="kembalikan-button"]`).should("be.visible");
    cy.get(`[data-cy="kembalikan-button"]`).click("center");
  });
});
