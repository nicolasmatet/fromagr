import * as React from 'react';
import BackgroundDarkSrc from '../../../public/background/fromager-logo-dark.png';
import { ProgressiveImg } from './ProgressiveImg';

export function BackgroundDark(props: any) {
    return <ProgressiveImg src={BackgroundDarkSrc} {...props} />

}
