import * as React from "react"
import { GraphNode } from "../interfaces/GraphNode"
import { getIcon } from "./Icons"
import { PairingListItem } from "./PairingListItem"

export function PairingParent(props: { graphNode: GraphNode<any> }) {
    const { graphNode } = props
    return (
        <PairingListItem
            key={graphNode.identity.low}
            IconComponent={getIcon(graphNode)}
            title={graphNode.properties.name}
            properties={graphNode.properties}
        ></PairingListItem>
    )
}