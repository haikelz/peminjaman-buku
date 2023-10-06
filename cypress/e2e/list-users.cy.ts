/**
 * Note: list-users page is only available in admin-only page
 */
describe("List users page", () => {
  it("Should display list users page and test it", () => {
    cy.visit("http://localhost:3000/dashboard/list-users");

    cy.get(`[data-cy="sidebar"]`).should("be.visible");
    cy.get(`[data-cy="header"]`).should("be.visible");

    cy.get(`[data-cy="dark-mode-switcher"]`).should("be.visible");
    cy.get(`[data-cy="dark-mode-switcher"]`).click("center");

    cy.get(`[data-cy="table-data"]`).should("be.visible");
  });
});
