import LoginForm from "./LoginForm";

import { renderWithProviders } from "../../../cypress/utils/test-utils";

describe("<LoginForm />", () => {
  beforeEach(() => {
    // see: https://on.cypress.io/mounting-react
    const { Wrapper } = renderWithProviders();
    cy.mount(Wrapper(<LoginForm />));
  });

  it("logs in", () => {
    cy.findByLabelText("Email").should("be.empty");
    cy.findByLabelText("Password").should("be.empty");

    cy.findByLabelText("Email").type(Cypress.env("userEmail"));
    cy.findByLabelText("Password").type(Cypress.env("password"));

    cy.findByText(/Login/i).click();

    cy.location("pathname").should("equal", "/home");
  });

  it("can redirect to sign up form", () => {
    cy.findByText("Don't have an account? Sign Up here.").click();

    cy.findByText(/Register/i).should("be.visible");
  });
});
