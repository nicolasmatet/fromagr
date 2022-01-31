import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BackgroundDarkSrc from '../../../public/background/fromager-logo-dark.png';

// export function BackgroundDark() {
//     return <LazyLoadImage src={BackgroundDarkSrc} />

// }

export function BackgroundDark() {
    return (<img src={BackgroundDarkSrc} />)
}

