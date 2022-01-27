import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, Link } from '@mui/material';
import { Fromage } from '../interfaces/Fromage';
import { getIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

export function LandingResult(props: { fromage: Fromage }) {
    const { fromage } = props;
    const navigate = useNavigate();
    const doPairing = () => navigate(`/pairing?nodeLabel=${fromage.labels[0]}&id=${fromage.identity.low}`, { replace: true });

    return (
        <ListItem onClick={doPairing}>
            <ListItemIcon>
                {React.createElement(getIcon(fromage))}
            </ListItemIcon>
            <ListItemText primary={fromage.properties.name} />
        </ListItem>
    )
}