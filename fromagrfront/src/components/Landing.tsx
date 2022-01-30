import * as React from 'react';
import { FromageService } from '../services/fromage.service';
import { VinOuFromage } from '../interfaces/Fromage';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { LandingResultList } from './LandingResultList';
import CloseIcon from '@mui/icons-material/Close';
const fromageService = new FromageService()

export function LandingPage() {
    const [searchText, setSearchText] = React.useState("")
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
        setSearchText(fromageName)
        if (fromageName && fromageName.length > 1) {
            setIsLoading(true);
            fromageService.searchByName(fromageName);
        } else {
            setIsLoading(false);
            setFromageList(null)
        }
    }

    function clearInput(){
        setSearchText('')
        setIsLoading(false);
        setFromageList(null)
    }

    return (
        <Box
            sx={{
                '& > :not(style)': { m: 2 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: 'end' }}>
                <TextField sx={{ bgcolor: 'background.paper' }} id="outlined-basic" label="Chercher un vin ou un fromage" variant="outlined"
                    onChange={onChange}
                    value={searchText} />
                <IconButton style={{ position: 'absolute' }} color='primary' onClick={clearInput} >
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Stack>

            <Box
            sx={{
                '& > :not(style)': { width: '28ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <LandingResultList results={fromageList} isLoading={isLoading}></LandingResultList>
            </Box>
        </Box>
    );


}