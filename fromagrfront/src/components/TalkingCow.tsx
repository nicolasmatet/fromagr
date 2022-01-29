import Talking from '../../public/fromager-talk.png'
import TalkinDark from '../../public/fromager-dark-talk.png'
import Box from '@mui/material/Box';
import * as React from 'react';
import { Typography, useTheme } from '@mui/material';


export function TalkingCow(props: { message: string, action?: any }) {
    const { message, action } = props;
    const theme = useTheme();

    return (
        <div style={{
            position: 'relative',
            bottom: 0,
            left: 0
        }}>
            <Typography
                sx={{
                    position: 'absolute', top: '3%', left: '5%', width: '90%', height: '21%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                variant='cow'>{message} {action ? action : ''}</Typography>
            <img style={{ width: '100%', maxWidth: '400px' }} src={theme.palette.mode === 'dark' ? TalkinDark : Talking} />
        </div >
    );
}