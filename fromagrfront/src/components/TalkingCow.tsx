
import * as React from 'react';
import { Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { TalkingLight } from './backgrounds/TalkingLight';
import { TalkingDark } from './backgrounds/TalkingDark';


export function TalkingCow(props: { message: string | null, action?: any }) {
    const { message, action } = props;
    const theme = useTheme();
    const img = theme.palette.mode === 'dark' ? <TalkingDark /> : <TalkingLight />
    const content = message ? message : <Stack sx={{width:'90%'}}>{[1, 2, 3].map((i) => <Skeleton variant="text" key={i} />)}</Stack>
    return (
        <div style={{
            position: 'relative',
            bottom: 0,
            left: 0
        }}>

            <Typography variant="cow"
                sx={{
                    position: 'absolute', top: '1%', left: '4%', width: '93%', height: '24%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1
                }}
            >
                {content}
                {action ? action : ''}
            </Typography>
            <div style={{ width: '100%', maxWidth: '400px' }}>{img}</div>
        </div >
    );
}