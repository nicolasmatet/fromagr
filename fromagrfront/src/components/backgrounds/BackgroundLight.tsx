import BackgroundLightSrc from '../../../public/background/fromager-logo.png';
import * as React from 'react';
import { ProgressiveImg } from './ProgressiveImg';

export function BackgroundLight(props: any) {
    return <ProgressiveImg src={BackgroundLightSrc} {...props} />
}

