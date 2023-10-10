import Login from "./Login";
import { renderWithProviders } from "../../../cypress/utils/test-utils";

describe("<Login />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    const { Wrapper } = renderWithProviders();
    cy.mount(Wrapper(<Login />));
  });
});
