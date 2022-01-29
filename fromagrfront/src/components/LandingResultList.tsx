import * as React from 'react';
import { VinOuFromage } from '../interfaces/Fromage';
import { List, Box, useTheme, Skeleton } from '@mui/material';
import { LandingResult } from './LandingResult';
import Logo from '../../public/fromager-logo.png';
import LogoDark from '../../public/fromager-logo-dark.png';
import LogoNoResult from '../../public/fromager-logo-no-result.png';
import { TalkingCow } from './TalkingCow';

export function LandingResultList(props: { results: VinOuFromage[] | null, isLoading: boolean }) {
    const theme = useTheme();
    const { results, isLoading } = props;

    if (isLoading) {
        return (<>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />

        </>)
    }
    if (!results) {
        return (
            <Box>
                <img src={theme.palette.mode === 'dark' ? LogoDark : Logo} />
            </Box>)
    }

    if (!results.length) {
        return (
                <TalkingCow message={"Pas de résultats."}></TalkingCow>
            );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }} component="nav" aria-label="fromages">
            {results.map(res => <LandingResult key={res.identity.low} result={res}></LandingResult>)}
        </List>

    )
}