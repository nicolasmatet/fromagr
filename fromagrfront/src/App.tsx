import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { Box, IconButton, PaletteMode, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PairingPage } from './components/PairingPage';
import { RootPage } from './components/RootPage';
import { green } from './components/colors/green';
import { purple } from './components/colors/purple';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    cow: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    cow?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    cow: true;
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' ? green : purple)
    },
    secondary: {
      ...(mode === 'light' ? purple : grey)
    },
    background: {
      ...(mode === 'light'
        ? {
          default: '#EEEEEE',
          paper: '#FFFFFF',
        }
        : {
          default: grey[900],
          paper: purple.dark
        }
      )
    },
    text: {
      ...(mode === 'light'
        ? {
          primary: '#000000',
          secondary: purple.main,
        }
        : {
          primary: '#ffffff',
          secondary: grey[100],
        }),
    },
  },
  typography: {
    cow: {
      fontFamily: 'Indie Flower',
    },
} });

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
        <Route path="/f/search" element={<LandingPage />} />
        <Route path="/f/pairing" element={<PairingPage />} />
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
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}
