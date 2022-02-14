import { Box } from '@mui/material';
import * as React from 'react';
import { MainStack } from './MainStack';
import { TalkingCow } from './TalkingCow';

export function Suggestions() {
    return (
        <MainStack>
            <Box sx={{
                '& > :not(style)': {
                    m: 3
                }
            }}>
                <TalkingCow message="Bientôt disponible."></TalkingCow>
            </Box>
        </MainStack>)
}