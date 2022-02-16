import { BottomNavigation, BottomNavigationAction, Paper, styled, Zoom } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { LandingPage } from './Landing';
import { Link, useLocation } from 'react-router-dom';
import { urlFavorites, urlSearch, urlSuggestions } from './urls';


const BottomNavigationActionStyled = styled((props: any) => {
    return <Zoom in={true}>{<BottomNavigationAction {...props} />}</Zoom>;
})(({ theme }) => ({
    color: theme.palette.secondary.main,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
    })
}));

const links = [
    { label: 'Recherche', icon: <SearchIcon />, url: urlSearch() },
    { label: 'Favoris', icon: <FavoriteIcon />, url: urlFavorites() },
    { label: 'Suggestions', icon: <LightbulbIcon />, url: urlSuggestions() }

]

export function BottomBar(props: any) {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    React.useEffect(() => {
        let idx = links.findIndex(link => link.url === location.pathname)
        if (idx >= 0) {
            setValue(idx)
        }
    }, [location])

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event: any, newValue: any) => {
                    setValue(newValue);
                }}
            >
                {links.map(link => <BottomNavigationActionStyled
                    key={link.label}
                    label={link.label}
                    icon={link.icon}
                    component={Link}
                    to={link.url} />)}
            </BottomNavigation>
        </Paper>

    )
}
