import * as React from 'react';
import { FromageService } from '../services/fromage.service';
import { VinOuFromage } from '../interfaces/Fromage';
import { Box, Stack } from '@mui/material';
import { LandingResultList } from './LandingResultList';
import { TextFieldWithClear } from './TextFieldWithClear';
import { MainStack } from './MainStack';
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
        <MainStack >
            <TextFieldWithClear label="Vin ou fromage ?" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}></TextFieldWithClear>
            <Box sx={{ '& > :not(style)': { width: '28ch' } }} >
                <LandingResultList results={fromageList} isLoading={isLoading}></LandingResultList>
            </Box>
        </MainStack>
    );


}