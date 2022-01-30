import { ThemeOptions } from "@mui/material";

export const dark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#863099',
            dark: '#56006a',
            light: '#b860ca',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#212121',
            paper: '#3b1641',
        },
        error: {
            main: '#ff8282',
        },
        warning: {
            main: '#ff9800',
        },
    },
    shape: {
        borderRadius: 4,
    },
    spacing: 8,
};