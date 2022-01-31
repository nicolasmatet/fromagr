import * as React from 'react';
import { VinOuFromage } from '../interfaces/Fromage';
import { List, Box, useTheme, Skeleton } from '@mui/material';
import { LandingResult } from './LandingResult';
import { TalkingCow } from './TalkingCow';
import { BackgroundLight } from './backgrounds/BackgroundLight';
import { BackgroundDark } from './backgrounds/BackgroundDark';

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
        const background = theme.palette.mode === 'dark' ? <BackgroundDark /> : <BackgroundLight />
        return (<Box style={{width:'150%'}}> {background} </Box>)
    }

    if (!results.length) {
        return (
            <TalkingCow message={"Pas de résultats."}></TalkingCow>
        );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav" aria-label="fromages">
            {results.map(res => <LandingResult key={res.identity.low} result={res}></LandingResult>)}
        </List>

    )
}