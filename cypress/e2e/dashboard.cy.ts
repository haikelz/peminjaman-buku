describe("Dashboard page", () => {
  it("Should show dashboard page and test it", () => {
    cy.visit("http://localhost:3000/dashboard");

    cy.get(`[data-cy="sidebar"]`).should("be.visible");
    cy.get(`[data-cy="header"]`).should("be.visible");

    cy.get(`[data-cy="dark-mode-switcher"]`).should("be.visible");
    cy.get(`[data-cy="dark-mode-switcher"]`).click("center");

    // searchbar
    cy.get(`[data-cy="searchbar"]`).should("be.visible");
    cy.get(`[data-cy="searchbar"]`).type("Things Fall Apart", { delay: 50 });

    // rekomendasi-buku modal
    cy.get(`[data-cy="rekomendasi-buku"]`).should("be.visible");

    // close rekomendasi-buku modal button
    cy.get(`[data-cy="close-modal-button"]`).should("be.visible");
    cy.get(`[data-cy="close-modal-button"]`).click("center");

    // book card
    cy.get(`[data-cy="book-card"]`).should("be.visible");

    // add to wishlist button
    cy.get(`[data-cy="add-to-wishlist-button"]`).should("be.visible");
    cy.get(`[data-cy="add-to-wishlist-button"]`).click("center");
  });
});
