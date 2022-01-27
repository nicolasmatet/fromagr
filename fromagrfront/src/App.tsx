import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/Landing';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { Box, IconButton, PaletteMode } from '@mui/material';
import { green, purple, grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...green,
      ...(mode === 'dark' && {
        main: green[300],
      }),
    },
    background: {
      ...(mode === 'light'
        ? {
          default: purple[400],
          paper: green[50],
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
          primary: green[900],
          secondary: green[800],
        }
        : {
          primary: '#fff',
          secondary: grey[500],
        }),
    },
  },
});

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{bgcolor:'background.default'}} className="App" >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      <Routes>
        <Route path="/" element={<LandingPage />} />
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
