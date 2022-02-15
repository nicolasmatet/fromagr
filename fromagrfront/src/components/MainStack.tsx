import { Stack, styled } from "@mui/material";
import * as React from "react";
const OffsetTop = styled('div')(({ theme }) => theme.mixins.toolbar);
const OffsetBottom = styled('div')(({ theme }) => theme.mixins.toolbar);

export function MainStack(props: any) {

    return (
        <Stack sx={{
            '& > :not(style)': { m: 1 },
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'start',
            spacing: 1
        }}>
            <OffsetTop />
            {props.children}
            <OffsetBottom />

        </Stack>
    )
}