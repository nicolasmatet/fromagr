import { List, Skeleton } from "@mui/material";
import * as React from "react";



export function PairingList(props: { expecting?: number, children?: any }) {
    const { expecting, children } = props;
    console.log(children);
    let content;
    if (!children) {
        content = Array.from(Array(expecting ? expecting : 1)).map((_, i) => <Skeleton key={i} variant="rectangular" height="64px" />)
    }
    else {
        content = children
    }
    return (
        <List sx={{ '& > :not(style)': { m: 2 } }} component="nav" aria-label="fromages">
            {children}
        </List>

    )
}