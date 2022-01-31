import { BottomNavigation, BottomNavigationAction, styled, Zoom } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { LandingPage } from './Landing';
import { Link } from 'react-router-dom';
import { urlFavorites, urlSearch, urlSuggestions } from './urls';


const BottomNavigationActionStyled = styled((props: any) => {
    return <Zoom in={true}>{<BottomNavigationAction {...props} />}</Zoom>;
})(({ theme }) => ({
    color: theme.palette.secondary.main,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
    })
}));

export function BottomBar() {
    const [value, setValue] = React.useState(0);
    const search = urlSearch()
    const fav = urlFavorites()
    const sugg = urlSuggestions()
    return (<BottomNavigation
        showLabels
        value={value}
        onChange={(event: any, newValue: any) => {
            setValue(newValue);
        }}
    >
        <BottomNavigationActionStyled label="Recherche" icon={<SearchIcon />} component={Link} to={search} />
        <BottomNavigationActionStyled label="Favoris" icon={<FavoriteIcon />} component={Link} to={fav} />
        <BottomNavigationActionStyled label="Suggestions" icon={<LightbulbIcon />} component={Link} to={sugg} />
    </BottomNavigation>
    )
}
