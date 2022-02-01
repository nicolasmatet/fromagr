import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CssBaseline, PaletteMode, Stack, Typography, Link } from '@mui/material';
import { PairingPage } from './components/PairingPage';
import { RootPage } from './components/RootPage';
import { light } from './components/themes/light';
import { dark } from './components/themes/dark';
import { typography } from './components/themes/typography';
import { urlFavorites, urlPairing, urlSearch, urlSuggestions } from './components/urls';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { Favorites } from './components/Favorites';
import { Suggestions } from './components/Suggestions';




export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

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
      longest: 1000
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
  return (
    <Routes>
      <Route path={urlSearch()} element={<>
        <TopBar />
        <LandingPage />
      </>
      } />
      <Route path={urlPairing()} element={<>
        <TopBar goBack={true} />
        <PairingPage />
      </>} />
      <Route path={urlFavorites()} element={<>
        <TopBar />
        <Favorites />
      </>
      } />
      <Route path={urlSuggestions()} element={<>
        <TopBar />
        <Suggestions />
      </>
      } />
      <Route path="/*" element={<RootPage />} />
    </Routes>
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
            <Offset />
            <Stack sx={{ display: 'flex', flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <App />
<Stack direction="row" spacing={1}>
<Typography variant="caption">
Nicolas Matet
</Typography>
<Link href="https://www.linkedin.com/in/nicolas-matet-644237a3">LinkedIn</Link>  
<Link href="https://GitHub.com/nicolasmatet"> GitHub </Link>
</Stack>
            </Stack>
            <BottomBar></BottomBar>
          </Stack>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

