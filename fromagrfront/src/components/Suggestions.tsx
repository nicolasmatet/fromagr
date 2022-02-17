import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Suggestion } from '../interfaces/Fromage';
import { SuggestionService } from '../services/suggestion.service';
import { MainStack } from './MainStack';
import { TalkingCow } from './TalkingCow';

export function Suggestions() {
    const [suggestion, setSuggestion] = React.useState<Suggestion | null>(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const random = !!searchParams.get("random")
    React.useEffect(() => {
        SuggestionService.getSuggestion(setSuggestion, random)
    }, [])

    return (
        <MainStack>
            <Box sx={{
                '& > :not(style)': {
                    m: 2,
                }
            }}>
                <TalkingCow message={suggestion ? suggestion.properties.text : null}></TalkingCow>
            </Box>
            <Typography variant="cow">Revenez demain !</Typography>

        </MainStack>)
}