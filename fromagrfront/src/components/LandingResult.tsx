import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, Link, Typography } from '@mui/material';
import { VinOuFromage } from '../interfaces/Fromage';
import { getIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

export function LandingResult(props: { result: VinOuFromage }) {
    const { result } = props;
    const navigate = useNavigate();
    const doPairing = () => navigate(`/f/pairing?nodeLabel=${result.labels[0]}&id=${result.identity.low}`, { replace: true });    
    const icon = React.createElement(getIcon(result));
    return (

        <ListItem onClick={doPairing} key={result.identity.low}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={result.properties.name} />
        </ListItem>
    )
}