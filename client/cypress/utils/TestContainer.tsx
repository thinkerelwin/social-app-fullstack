import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { themeSettings } from "../../src/theme";
import { useAppSelector } from "../../src/store/hook";

export function TestContainer({
  children,
}: Readonly<{ children: JSX.Element }>) {
  const themeMode = useAppSelector((state) => state.themeMode);
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
