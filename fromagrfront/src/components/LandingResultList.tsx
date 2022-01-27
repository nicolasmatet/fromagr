import * as React from 'react';
import { Fromage } from '../interfaces/Fromage';
import { List, Box, useTheme } from '@mui/material';
import { LandingResult } from './LandingResult';
import Logo from '../../public/fromager-logo.png';
import LogoDark from '../../public/fromager-logo-dark.png';
import LogoNoResult from '../../public/fromager-logo-no-result.png';

export function LandingResultList(props: { fromages: Fromage[] | null }) {
    const theme = useTheme();
    const { fromages } = props;

    if (!fromages) {
        return (
            <Box>
                <img src={theme.palette.mode === 'dark' ? LogoDark : Logo} />
            </Box>)
    }

    if (!fromages.length) {
        return (
            <Box>
                <img src={LogoNoResult} />
            </Box>)
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }} component="nav" aria-label="fromages">
            {fromages.map(fromage => <LandingResult key={fromage.identity.low} fromage={fromage}></LandingResult>)}
        </List>

    )
}