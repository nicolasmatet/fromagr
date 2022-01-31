import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export function BottomBar() {
    const [value, setValue] = React.useState(0);

    return (<BottomNavigation
        showLabels
        value={value}
        onChange={(event: any, newValue: any) => {
            setValue(newValue);
        }}
    >
        <BottomNavigationAction label="Recherche" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favoris" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Suggestions" icon={<LightbulbIcon />} />
    </BottomNavigation>
    )
}