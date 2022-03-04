import * as React from 'react';
import BackgroundDarkSrc from '../../../public/background/fromager-logo-dark.png';
import { ProgressiveImg } from './ProgressiveImg';
import BackgroundLightSrc from '../../../public/background/fromager-logo.png';
import { useTheme } from '@mui/material';

export function BackgroundCow(props: any) {
    const theme = useTheme()
    const background = theme.palette.mode === "dark" ? BackgroundDarkSrc : BackgroundLightSrc;
    return <ProgressiveImg src={background} {...props} />

}