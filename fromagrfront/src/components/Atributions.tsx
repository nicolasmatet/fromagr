import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { BackgroundCow } from './backgrounds/BackgroundCow';
import { CheeseIcon, CowIcon, GoatIcon, RedWineIcon, SheepIcon, WhiteWineIcon, WineIcon } from './Icons';
import { MainStack } from './MainStack';
import { TalkingCow } from './TalkingCow';

export function Attributions() {
    return <MainStack>
        <Box sx={{ '& > :not(style)': { width: '28ch' } }} >
            <Stack spacing={3}>

                <div>
                    <div style={{ width: '116px', height: '203px', margin: 'auto' }}>
                        <BackgroundCow />
                    </div>
                    <Typography variant="caption">
                        <a href='https://www.rawpixel.com/techi/showcase'>Techi</a> @ RawPixel, <a href="https://www.rawpixel.com/services/licenses">Commercial Licence</a>
                    </Typography>
                </div>

                <Stack style={{ alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} >
                        <CowIcon />
                        <GoatIcon />
                        <SheepIcon />
                    </Stack>
                    <Typography variant="caption">
                        <a href='https://thenounproject.com/alfiandwiha95/'>Hartanto</a> @ NounProject.com, <a href="https://thenounproject.com/pricing/#icons">CC BY</a>
                    </Typography>
                </Stack>

                <Stack style={{ alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} >
                        <RedWineIcon />
                        <WhiteWineIcon />
                    </Stack>
                    <Typography variant="caption">
                        <a href='https://thenounproject.com/Arionzo/'>Arianna Sbaffi</a> @ NounProject.com, <a href="https://thenounproject.com/pricing/#icons">CC BY</a>
                    </Typography>
                </Stack>

                <Stack style={{ alignItems: 'center' }}>
                    <Stack direction="row" spacing={1}>
                        <WineIcon />
                        <CheeseIcon />
                    </Stack>
                    <Typography variant="caption">
                        <a href='https://thenounproject.com/valeriy25/'>Valeriy</a> @ NounProject.com, <a href="https://thenounproject.com/pricing/#icons">CC BY</a>
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    </MainStack>
}