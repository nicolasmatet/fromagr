import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VinOuFromage } from "../interfaces/Fromage";
import { FromageService } from "../services/fromage.service";
import { PairingList } from "./PairingList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TalkingCow } from "./TalkingCow";
import SearchIcon from '@mui/icons-material/Search';
const fromageService = new FromageService()

export function PairingPage() {
    const initialPairingList: VinOuFromage[] | null = null;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pairingList, setPairingList] = React.useState(initialPairingList);
    const sourceLabel = searchParams.get("nodeLabel")
    const sourceId = searchParams.get("id")
    const navigate = useNavigate()
    React.useEffect(() => {
        FromageService.awaitPairings(sourceLabel, sourceId, setPairingList);
    }, []);

    const pairingListRender = renderPairingList(pairingList, navigate);
    const pairingParentRender = renderPairingParent(pairingList)
    return (

        <>
            <ArrowBackIcon color='primary' sx={{ position: 'absolute', m: 3 }} onClick={() => navigate(-1)}></ArrowBackIcon>

            <Stack spacing={1} sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'start',
                spacing: 1
            }}>
                {pairingParentRender}
                {pairingListRender}
            </Stack>
        </>
    )
}

function renderPairingParent(pairingList: VinOuFromage[] | null) {
    if (!pairingList || pairingList.length === 0) {
        return <PairingList graphNodes={null} expecting={1}></PairingList>
    }
    return <PairingList graphNodes={[pairingList[0]]} expecting={1}></PairingList>

}
function renderPairingList(pairingList: VinOuFromage[] | null, navigate:any) {
    if (!pairingList) {
        return <PairingList graphNodes={null} expecting={2}></PairingList>
    }
    if (pairingList.length < 2) {
        const action = <Stack direction="row" spacing={2} onClick={() => navigate(-1)}><SearchIcon></SearchIcon>Retour à la recherche</Stack>
        return <TalkingCow message={"Pas de recomandations."} action={action}></TalkingCow>;
    }
    return (<Stack>
        <Typography color="primary">
            Recommandations:
        </Typography>
        <PairingList graphNodes={pairingList.slice(1, pairingList.length)}></PairingList>
    </Stack>)
}
