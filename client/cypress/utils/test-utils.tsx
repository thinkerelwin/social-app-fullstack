import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
// import { render } from '@testing-library/react'
// import type { RenderOptions } from '@testing-library/react'
// import { configureStore } from '@reduxjs/toolkit'
// import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../src/theme";

import { setupStore } from "../../src/store/index";
// import type { AppStore, RootState } from '../../src/store'
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>
//   store?: AppStore
// }

const theme = createTheme(themeSettings("light"));

export function renderWithProviders({
  preloadedState = undefined,
  // Automatically create a store instance if no store was passed in
  store = setupStore(preloadedState),
} = {}) {
  function Wrapper(children: PropsWithChildren<JSX.Element>): JSX.Element {
    console.log("store", store);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
  return { store, Wrapper };
}
