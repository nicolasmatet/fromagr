import * as React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode, Stack } from '@mui/material';
import { light } from './components/themes/light';
import { dark } from './components/themes/dark';
import { typography } from './components/themes/typography';
import { BottomBar } from './components/BottomBar';
import { wakeup } from './services/api.service';
import i18n from './i18n';
import { useTranslation } from "react-i18next";
import { AppRoutes } from './AppRoutes';




export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const getDesignTokens = (mode: PaletteMode) => ({
  ...(mode === 'light' ? light : dark),
  typography: typography,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  }
});


function App() {
  const { t } = useTranslation('translation', { i18n });
  React.useEffect(() => { wakeup().then(() => console.log("Prêt !")) }, [])
  return (
    <AppRoutes></AppRoutes>
  );
}


export default function ToggleColorMode(props: any) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
          <Stack sx={{ display: 'flex', direction: 'column', height: '100%' }}>
            <Stack sx={{ display: 'flex', flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <App />
            </Stack>
            <BottomBar></BottomBar>
          </Stack>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}
