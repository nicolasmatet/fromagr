
import * as React from 'react';
import { Typography, useTheme } from '@mui/material';
import { Talking, TalkingDark } from './Backgrounds';


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
                >{message} {action ? action : ''}</Typography>
            <img style={{ width: '100%', maxWidth: '400px' }} src={theme.palette.mode === 'dark' ? TalkingDark : Talking} />
        </div >
    );
}