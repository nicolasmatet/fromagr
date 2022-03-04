import { Box, Stack, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VinOuFromage } from "../interfaces/Fromage";
import { FromageService } from "../services/fromage.service";
import { PairingList } from "./PairingList";
import { TalkingCow } from "./TalkingCow";
import SearchIcon from '@mui/icons-material/Search';
import { PairingListItem } from "./PairingListItem";
import { MainStack } from "./MainStack";

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

        <MainStack>
            <RenderPairingParent pairingList={pairingList}></RenderPairingParent>
            <RenderPairingList pairingList={pairingList}></RenderPairingList>
        </MainStack>
    )
}

function RenderPairingParent(props: { pairingList: VinOuFromage[] | null }) {
    const { pairingList } = props
    if (!pairingList || pairingList.length === 0) {
        return <PairingList expecting={1}></PairingList>
    }
    return <PairingList>
        <PairingListItem
            key={pairingList[0].identity.low}
            graphNode={pairingList[0]}
        ></PairingListItem>
    </PairingList>

}
function RenderPairingList(props: { pairingList: VinOuFromage[] | null }) {
    const navigate = useNavigate()
    const { pairingList } = props
    if (!pairingList) {
        return <PairingList expecting={2}></PairingList>
    }
    if (pairingList.length < 2) {
        const action = <Stack direction="row" spacing={2} onClick={() => navigate(-1)}><SearchIcon></SearchIcon>Retour à la recherche</Stack>
        return <TalkingCow message={"Pas de recomandations."} action={action}></TalkingCow>;
    }
    const content = pairingList.slice(1, pairingList.length).map(node =>
        <PairingListItem
            key={node.identity.low}
            graphNode={node}
        ></PairingListItem>)
    return (<Stack>
        <Typography color="primary">
            Recommandations:
        </Typography>
        <PairingList>
            {content}
        </PairingList>

    </Stack>)
}
