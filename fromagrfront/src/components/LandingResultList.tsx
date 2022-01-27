import * as React from 'react';
import { Fromage } from '../interfaces/Fromage';
import { Button, List, ListItem, ListItemText, SvgIcon, Divider, Box } from '@mui/material';
import { LandingResult } from './LandingResult';
import Logo from '../../public/fromager-logo.png';

export function LandingResultList(props: { fromages: Fromage[] }) {
    if (!props.fromages || !props.fromages.length){
        return (
        <Box>
            <img src={Logo} />
        </Box>)
    }
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius:2 }} component="nav" aria-label="fromages">
            {props.fromages.map(fromage => <LandingResult key={fromage.identity.low} fromage={fromage}></LandingResult>)}
        </List>

    )
}