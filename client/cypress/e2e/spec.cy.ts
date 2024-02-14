describe("logs in", () => {
  it("renders", () => {
    cy.visit("/");

    cy.findByText(/Welcome to SocialApp/i).should("be.visible");
    cy.findByText(/Login/i).should("be.visible");
  });
});
