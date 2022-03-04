import * as React from 'react';
import { VinOuFromage } from '../interfaces/Fromage';
import { List, Box, useTheme, Skeleton, Slide, FormControlLabel, Switch, styled, Typography, Stack, Link } from '@mui/material';
import { LandingResult } from './LandingResult';
import { TalkingCow } from './TalkingCow';
import { Footer } from './Footer';
import { BackgroundCow } from './backgrounds/BackgroundCow';

const MovingCow = styled((props: any) => {
    const style = { position: 'absolute', top: 0 }
    return <Slide direction="up" in={true} container={props.containerRef.current}>
        <div style={{ width: '150%', position: 'relative' }}>
            <div style={{ paddingBottom: '175.5%' }} />
            <BackgroundCow style={style}/>
        </div>
    </Slide>;
})(({ theme }) => ({}));

export function LandingResultList(props: { results: VinOuFromage[] | null, isLoading: boolean }) {
    const theme = useTheme();
    const { results, isLoading } = props;
    const containerRef = React.useRef(null);

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
            <Box sx={{ width: '150%' }} ref={containerRef}>
                <MovingCow mode={theme.palette.mode} containerRef={containerRef}></MovingCow>
                <Footer/>
            </Box >
        )
    }

    if (!results.length) {
        return (
            <TalkingCow message={"Pas de résultats."}></TalkingCow>
        );
    }

    return (
        <List sx={{ bgcolor: 'background.paper' }} component="nav" aria-label="fromages">
            {results.map(res => <LandingResult key={res.identity.low} result={res}></LandingResult>)}
        </List>

    )
}