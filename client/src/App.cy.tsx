import App from "./App";

import { renderWithProviders } from "../cypress/utils/test-utils";

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    const { Wrapper } = renderWithProviders();
    cy.mount(Wrapper(<App />));
  });
});
