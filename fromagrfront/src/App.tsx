import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, useTheme, createTheme, styled } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, IconButton, PaletteMode, Slide, Stack, Toolbar, useScrollTrigger } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PairingPage } from './components/PairingPage';
import { RootPage } from './components/RootPage';
import { light } from './components/themes/light';
import { dark } from './components/themes/dark';
import { typography } from './components/themes/typography';
import { urlPairing, urlSearch } from './components/urls';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';




export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const getDesignTokens = (mode: PaletteMode) => ({
  ...(mode === 'light' ? light : dark),
  typography: typography
});


function App() {
  return (
    <Routes>
      <Route path={urlSearch()} element={
        <>
          <TopBar />
          <LandingPage />
        </>
      } />
      <Route path={urlPairing()} element={<>
        <TopBar goBack={true} />
        <PairingPage />
      </>} />
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
            <Stack sx={{ display: 'flex', flexGrow: 1, overflowY:'auto', overflowX:'hidden' }}>
              <App />
            </Stack>
            <BottomBar></BottomBar>
          </Stack>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

