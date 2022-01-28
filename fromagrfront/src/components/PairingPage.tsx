import { Box } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VinOuFromage } from "../interfaces/Fromage";
import { FromageService } from "../services/fromage.service";
import { PairingList } from "./PairingList";
import { PairingParent } from "./PairingParent";

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

    const pairingListRender = renderPairingList(pairingList);
    const pairingParentRender = renderPairingParent(pairingList)
    return (
        <Box sx={{
            '& > :not(style)': { m: 2, width: '30ch', borderRadius: 2 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'start'
        }}>
            {pairingParentRender}
            {pairingListRender}
        </Box >
    )
}

function renderPairingParent(pairingList: VinOuFromage[] | null) {
    if (!pairingList || pairingList.length === 0) {
        return <></>;
    }
    return <PairingParent graphNode={pairingList[0]}></PairingParent>;

}
function renderPairingList(pairingList: VinOuFromage[] | null) {
    if (!pairingList || pairingList.length < 2) {
        return <>Meuh ! Pas de résultats...</>;
    }
    return <PairingList graphNodes={pairingList.slice(1, pairingList.length)}></PairingList>;
}
