import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TalkinDarkSrc from '../../../public/background/fromager-dark-talk.png'

export function TalkingDark() {
    return <LazyLoadImage src={TalkinDarkSrc} />
}