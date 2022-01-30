import { List } from "@mui/material"
import * as React from "react"
import { VinOuFromage } from "../interfaces/Fromage"
import { GraphNode } from "../interfaces/GraphNode"
import { getIcon } from "./Icons"
import { PairingListItem } from "./PairingListItem"

export function PairingParent(props: { graphNode: VinOuFromage }) {
    const { graphNode } = props
    return (
        <List sx={{ '& > :not(style)': { m: 2 } }}      >
            <PairingListItem
                key={graphNode.identity.low}
                graphNode={graphNode}
            ></PairingListItem>
        </List>
    )
}