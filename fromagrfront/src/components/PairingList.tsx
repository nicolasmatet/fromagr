import { List, Skeleton } from "@mui/material";
import * as React from "react";
import { GraphNode } from "../interfaces/GraphNode";
import { getIcon } from "./Icons";
import { PairingListItem } from "./PairingListItem";



export function PairingList(props: { graphNodes: GraphNode<any>[] | null, expecting?: number }) {
    const { graphNodes, expecting } = props;
    let content;
    if (!graphNodes || graphNodes.length === 0) {
        content = Array.from(Array(expecting ? expecting : 1)).map(() => <Skeleton variant="rectangular" height="64px"/>)
    } else {
        content = graphNodes.map(node =>
            <PairingListItem
                key={node.identity.low}
                IconComponent={getIcon(node)}
                title={node.properties.name}
                properties={node.properties}
            ></PairingListItem>)
    }
    return (
        <List sx={{ '& > :not(style)': { m: 2 } }} component="nav" aria-label="fromages">
            {content}
        </List>

    )
}