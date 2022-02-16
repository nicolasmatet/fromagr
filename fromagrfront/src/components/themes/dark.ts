import { ThemeOptions } from "@mui/material";

export const dark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#FA8989',
            dark: '#FA8989',
            light: '#FA8989',
        },
        secondary: {
            main: '#4A8D81',
        },
        background: {
            default: '#161515',
            paper: '#040404',
        },
        error: {
            main: '#FA8989',
        },
        warning: {
            main: '#FA8989',
        },
    },
    shape: {
        borderRadius: 4,
    },
    spacing: 8,
};