import WikiDataSrc from '../../../public/background/wikidata.png'
import WikiDataDarkSrc from '../../../public/background/wikidata_dark.png'
import * as React from 'react';
import { ProgressiveImg } from './ProgressiveImg';
import { useTheme } from '@mui/material';

export function WikiData(props: any) {
    const theme = useTheme()
    const background = theme.palette.mode === "dark" ? WikiDataDarkSrc : WikiDataSrc;
    return <ProgressiveImg src={background} {...props} />

}
function WikiDataLight(props: any) {
    return (<ProgressiveImg src={WikiDataSrc} {...props} />)
}


function WikiDataDark(props: any) {
    return (<ProgressiveImg src={WikiDataDarkSrc} {...props} />)
}
