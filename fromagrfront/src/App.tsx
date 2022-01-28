import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { Box, IconButton, PaletteMode } from '@mui/material';
import { teal, purple, grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PairingPage } from './components/PairingPage';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' ? teal : purple)
    },
    secondary: {
      ...(mode === 'light' ? purple : grey)
    },
    background: {
      ...(mode === 'light'
        ? {
          default: purple[400],
          paper: teal[50],
        }
        : {
          default: grey[900],
          paper: purple[900],
        }
      )
    },
    text: {
      ...(mode === 'light'
        ? {
          primary: teal[900],
          secondary: purple[900],
        }
        : {
          primary: '#fff',
          secondary: grey[100],
        }),
    },
  },
});

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      maxHeight: '100%',
      height: '100%',
      overflow:'hidden'
    }}>

      <Box sx={{
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        flexGrow: 0
      }}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon color="secondary" /> : <Brightness4Icon color="primary" />}
        </IconButton>
      </Box>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pairing" element={<PairingPage />} />
      </Routes>
    </Box>

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
