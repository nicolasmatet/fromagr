import * as React from 'react';
import { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import fromageIcon from '/public/noun-cheese.svg';
import { Button, List, ListItem, ListItemText, SvgIcon, Divider } from '@mui/material';
import { FromageService } from '../services/fromage.service';
import { Fromage } from '../interfaces/Fromage';
import { LandingResultList } from './LandingResultList';

const fromageService = new FromageService()

export function LandingPage() {
    const initialFromage: string = '';
    const initialFromageList: Fromage[] = []
    const [fromage, setFromage] = React.useState(initialFromage);
    const [fromageList, setFromageList] = React.useState(initialFromageList);

    React.useEffect(() => {
        const subscription = fromageService.subscribeTosearchResults(setFromageList);
        return () => subscription.unsubscribe();
    }, []);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fromageName = event.target.value;
        if (fromageName && fromageName.length > 1) {
            fromageService.searchByName(fromageName);
        } else {
            setFromageList([])
        }
    }
    return (
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 2, width: '28ch', borderRadius:2},
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center'}}
                noValidate
                autoComplete="off">
                <TextField sx={{bgcolor: 'background.paper' }} id="outlined-basic" label="Chercher un fromage" variant="outlined" onChange={onChange} />
                <LandingResultList fromages={fromageList}></LandingResultList>
            </Box>
    );


}