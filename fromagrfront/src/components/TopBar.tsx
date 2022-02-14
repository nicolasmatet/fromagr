import { AppBar, Box, IconButton, Slide, Toolbar, Typography, useScrollTrigger, useTheme } from "@mui/material";
import * as React from 'react';
import { ColorModeContext } from "../App";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";

function ScrollToHide(props: any) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold
  });
  console.log("trigger", trigger)
  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}


export function TopBar(props: { goBack?: boolean }) {
  const { goBack } = props
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const content = [
    <IconButton key='theme' onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon color="secondary" /> : <Brightness4Icon color="secondary" />}
    </IconButton>,
    ...(goBack ? [<ArrowBackIcon key='back' color='secondary' onClick={() => { navigate(-1) }}></ArrowBackIcon>] : []),
  ]
  return (
    <ScrollToHide threshold={0}>
      <AppBar position="fixed" >
        <Toolbar style={{ direction: 'rtl' }} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          {content}
        </Toolbar>
      </AppBar>
    </ScrollToHide>
  );
};