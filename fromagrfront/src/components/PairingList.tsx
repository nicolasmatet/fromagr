import { List } from "@mui/material";
import * as React from "react";
import { GraphNode } from "../interfaces/GraphNode";
import { getIcon } from "./Icons";
import { PairingListItem } from "./PairingListItem";



export function PairingList(props: { graphNodes: GraphNode<any>[] }) {
    const { graphNodes } = props;
    return (
        <List sx={{'& > :not(style)': { m: 2, borderRadius: 2 }, width: '100%' }} component="nav" aria-label="fromages">
            {graphNodes.map(node =>
                <PairingListItem
                    key={node.identity.low}
                    IconComponent={getIcon(node)}
                    title={node.properties.name}
                    properties={node.properties}
                ></PairingListItem>)}
        </List>

    )
}