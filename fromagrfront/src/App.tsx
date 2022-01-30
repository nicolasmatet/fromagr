import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, IconButton, PaletteMode, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PairingPage } from './components/PairingPage';
import { RootPage } from './components/RootPage';
import { light } from './components/themes/light';
import { dark } from './components/themes/dark';
import { typography } from './components/themes/typography';
import { urlPairing, urlSearch } from './components/urls';



const getDesignTokens = (mode: PaletteMode) => ({
  ...(mode === 'light' ? light : dark),
  typography: typography
});

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Stack sx={{
      bgcolor: 'background.default',
      minHeight: '100%',
    }}>

      <Box sx={{
        m: 2,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        flexGrow: 0
      }}>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon color="primary" /> : <Brightness4Icon color="primary" />}
        </IconButton>
      </Box>


      <Routes>
        <Route path={urlSearch()} element={<LandingPage />} />
        <Route path={urlPairing()} element={<PairingPage />} />
        <Route path="/*" element={<RootPage />} />
      </Routes>
    </Stack>

  );
}

export default function ToggleColorMode() {
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
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}
