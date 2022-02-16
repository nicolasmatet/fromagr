import { Fab, useTheme, Zoom } from "@mui/material";
import * as React from 'react';
import { ColorModeContext } from "../App";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


export function TopBar(props: { goBack?: boolean }) {
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const { goBack } = props
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const content = [

    <Fab key={'theme'} sx={{ position: 'fixed', top: 0, right: 0, m: 2, zIndex: 9999 }}
      onClick={colorMode.toggleColorMode}
      size='small' color="secondary" aria-label="theme">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </Fab >,

      <Zoom
        key={'back'}
        in={goBack === true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab sx={{ position: 'fixed', top: 0, left: 0, m: 2, zIndex: 9999 }}
          onClick={() => { navigate(-1) }}
          size='small' color="secondary" aria-label="back">
          <ArrowBackIcon />
        </Fab>
      </Zoom>,
  ]
  return (
    <>
      {content}
    </> 
  );
};