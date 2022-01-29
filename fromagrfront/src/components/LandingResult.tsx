import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, Link } from '@mui/material';
import {  VinOuFromage } from '../interfaces/Fromage';
import { getIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

export function LandingResult(props: { result: VinOuFromage }) {
    const { result } = props;
    const navigate = useNavigate();
    const doPairing = () => navigate(`/f/pairing?nodeLabel=${result.labels[0]}&id=${result.identity.low}`, { replace: true });

    return (
        <ListItem onClick={doPairing}>
            <ListItemIcon>
                {React.createElement(getIcon(result))}
            </ListItemIcon>
            <ListItemText primary={result.properties.name} />
        </ListItem>
    )
}