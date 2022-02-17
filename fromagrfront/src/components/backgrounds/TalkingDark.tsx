import * as React from 'react';
import TalkinDarkSrc from '../../../public/background/fromager-dark-talk.png'
import { ProgressiveImg } from './ProgressiveImg';

export function TalkingDark(props: any) {
    return <ProgressiveImg src={TalkinDarkSrc}     {...props} />
}