import * as React from 'react';
import { FromageService } from '../services/fromage.service';
import { VinOuFromage } from '../interfaces/Fromage';
import { Box, TextField } from '@mui/material';
import { LandingResultList } from './LandingResultList';

const fromageService = new FromageService()

export function LandingPage() {
    const [fromageList, setFromageList] = React.useState<VinOuFromage[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const subscription = fromageService.subscribeToSearchResults((res: VinOuFromage[]) => {
            setFromageList(res);
            setIsLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fromageName = event.target.value;
        if (fromageName && fromageName.length > 1) {
            setIsLoading(true);
            fromageService.searchByName(fromageName);
        } else {
            setIsLoading(false);
            setFromageList(null)
        }
    }
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 2, width: '28ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TextField sx={{ bgcolor: 'background.paper' }} id="outlined-basic" label="Chercher un vin ou un fromage" variant="outlined" onChange={onChange} />
            <LandingResultList results={fromageList} isLoading={isLoading}></LandingResultList>
        </Box>
    );


}