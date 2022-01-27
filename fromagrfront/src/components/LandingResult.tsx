import * as React from 'react';
import {ListItem, ListItemText, ListItemIcon, SvgIcon } from '@mui/material';
import { Fromage } from '../interfaces/Fromage';
import  { ReactComponent as CheeseIcon } from '../../public/noun-cheese.svg';

export function LandingResult(props:{fromage:Fromage}){
    return (
        <ListItem button>
            <ListItemIcon>
                <SvgIcon component={CheeseIcon} viewBox="0 0 590 580" ></SvgIcon>
            </ListItemIcon>
            <ListItemText primary={props.fromage.properties.name} />
        </ListItem>
    )
}