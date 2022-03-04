import WikiDataSrc from '../../../public/background/wikidata.png'
import WikiDataDarkSrc from '../../../public/background/wikidata_dark.png'
import * as React from 'react';
import { ProgressiveImg } from './ProgressiveImg';

export function WikiDataLight(props: any) {
    return (<ProgressiveImg src={WikiDataSrc} {...props} />)
}


export function WikiDataDark(props: any) {
    return (<ProgressiveImg src={WikiDataDarkSrc} {...props} />)
}
