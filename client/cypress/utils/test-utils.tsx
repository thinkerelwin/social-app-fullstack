import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { setupStore } from "../../src/store/index";
import { TestContainer } from "./TestContainer";

export function renderWithProviders({
  preloadedState = undefined,
  // Automatically create a store instance if no store was passed in
  store = setupStore(preloadedState),
} = {}) {
  function Wrapper(children: PropsWithChildren<JSX.Element>): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <TestContainer>{children}</TestContainer>
        </PersistGate>
      </Provider>
    );
  }
  return { store, Wrapper };
}
