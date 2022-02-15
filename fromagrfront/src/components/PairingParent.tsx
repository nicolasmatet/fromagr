import * as React from "react"
import { VinOuFromage } from "../interfaces/Fromage"
import { PairingList } from "./PairingList"
import { PairingListItem } from "./PairingListItem"

export function PairingParent(props: { graphNode: VinOuFromage }) {
    const { graphNode } = props
    return (
        <PairingList      >
            <PairingListItem
                key={graphNode.identity.low}
                graphNode={graphNode}
            ></PairingListItem>
        </PairingList>
    )
}