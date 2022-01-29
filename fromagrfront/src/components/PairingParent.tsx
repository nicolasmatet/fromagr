import { Box, List, Typography } from "@mui/material"
import * as React from "react"
import { VinOuFromage } from "../interfaces/Fromage"
import { GraphNode } from "../interfaces/GraphNode"
import { getIcon } from "./Icons"
import { PairingListItem } from "./PairingListItem"

export function PairingParent(props: { graphNode: GraphNode<any> }) {
    const { graphNode } = props
    return (
        <List sx={{'& > :not(style)': { m: 2 }}}      >
            <PairingListItem
                key={graphNode.identity.low}
                IconComponent={getIcon(graphNode)}
                title={graphNode.properties.name}
                properties={graphNode.properties}
            ></PairingListItem>
        </List>
    )
}