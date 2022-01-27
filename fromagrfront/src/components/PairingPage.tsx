import { Box } from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { VinOuFromage } from "../interfaces/Fromage";
import { FromageService } from "../services/fromage.service";
import { PairingList } from "./PairingList";

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

    const pairingListRender = renderPairingList(pairingList);
    return (
        <Box sx={{
            '& > :not(style)': { m: 2, width: '30ch', borderRadius: 2 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'start'
        }}>
            {/* <PairingParent graphNode={parent}></PairingParent> */}
            {pairingListRender}
        </Box >
    )
}

function renderPairingList(pairingList: VinOuFromage[] | null) {
    if (!pairingList) {
        return <></>;
    }
    return <PairingList graphNodes={pairingList}></PairingList>;
}
