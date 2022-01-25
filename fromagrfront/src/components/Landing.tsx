import * as React from 'react';
import { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  fromageIcon from '/public/noun-cheese.svg';
import { Button, SvgIcon } from '@mui/material';


interface LandingPageProps {
    
}
 
interface LandingPageState {
    
}
 
export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    constructor(props: LandingPageProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >                
                <TextField id="outlined-basic" label="Chercher un fromage" variant="outlined" />
                <Button>
                </Button>
            </Box>
         );
    }
}
 
