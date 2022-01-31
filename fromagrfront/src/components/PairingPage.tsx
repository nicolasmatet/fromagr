import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VinOuFromage } from "../interfaces/Fromage";
import { FromageService } from "../services/fromage.service";
import { PairingList } from "./PairingList";
import { TalkingCow } from "./TalkingCow";
import SearchIcon from '@mui/icons-material/Search';
const fromageService = new FromageService()

export function PairingPage() {
    const initialPairingList: VinOuFromage[] | null = null;
    const [searchParams, setSearchParams] = useSearchParams();
    const [pairingList, setPairingList] = React.useState(initialPairingList);
    const sourceLabel = searchParams.get("nodeLabel")
    const sourceId = searchParams.get("id")

    React.useEffect(() => {
        FromageService.awaitPairings(sourceLabel, sourceId, setPairingList);
    }, []);

    return (

        <>
            <Stack spacing={1} sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'start',
                spacing: 1
            }}>
                <RenderPairingParent pairingList={pairingList} ></RenderPairingParent>
                <RenderPairingList pairingList={pairingList}></RenderPairingList>
            </Stack>
        </>
    )
}

function RenderPairingParent(props: { pairingList: VinOuFromage[] | null }) {
    const { pairingList } = props
    if (!pairingList || pairingList.length === 0) {
        return <PairingList graphNodes={null} expecting={1}></PairingList>
    }
    return <PairingList graphNodes={[pairingList[0]]} expecting={1}></PairingList>

}
function RenderPairingList(props: { pairingList: VinOuFromage[] | null }) {
    const navigate = useNavigate()
    const { pairingList } = props
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
