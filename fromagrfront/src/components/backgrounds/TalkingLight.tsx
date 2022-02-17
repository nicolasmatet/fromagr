import TalkingSrc from '../../../public/background/fromager-talk.png'
import * as React from 'react';
import { ProgressiveImg } from './ProgressiveImg';

export function TalkingLight(props: any) {
    return (<ProgressiveImg src={TalkingSrc} {...props} />)
}

