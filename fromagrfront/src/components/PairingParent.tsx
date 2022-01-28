import { Box, Typography } from "@mui/material"
import * as React from "react"
import { VinOuFromage } from "../interfaces/Fromage"
import { GraphNode } from "../interfaces/GraphNode"
import { getIcon } from "./Icons"
import { PairingListItem } from "./PairingListItem"

export function PairingParent(props: { graphNode: GraphNode<any> }) {
    const { graphNode } = props
    return (
        <Box sx={{'& > :not(style)': { m: 2, width: '28ch', borderRadius: 2 }}}>    
        <PairingListItem
            key={graphNode.identity.low}
            IconComponent={getIcon(graphNode)}
            title={graphNode.properties.name}
            properties={graphNode.properties}
        ></PairingListItem>

            <Typography variant="h5" color="text.secondary">
                    Recommandations:    
            </Typography>

        </Box>

    )
}