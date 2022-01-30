import { ThemeOptions } from "@mui/material";

export const light: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#61b8a8',
            light: '#93ebd9',
            dark: '#2d8879',
        },
        secondary: {
            main: '#863099',
            light: '#b860ca',
            dark: '#56006a',
        },
        background: {
            default: '#eeeeee',
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