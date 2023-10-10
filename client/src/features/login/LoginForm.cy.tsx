import LoginForm from "./LoginForm";

import { renderWithProviders } from "../../../cypress/utils/test-utils";

describe("<LoginForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    const { Wrapper } = renderWithProviders();
    cy.mount(Wrapper(<LoginForm />));
  });
});
