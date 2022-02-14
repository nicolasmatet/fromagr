import { Stack } from "@mui/material";
import * as React from "react";

export function MainStack(props: any) {

    return (
        <Stack sx={{
            '& > :not(style)': { m: 1, width: '30ch' },
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'start',
            spacing: 1
        }}>
            {props.children}
        </Stack>
    )
}