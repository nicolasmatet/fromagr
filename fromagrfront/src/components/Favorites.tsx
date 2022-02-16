import { Box, Card, CardHeader, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { VinOuFromage } from '../interfaces/Fromage';
import { favoriteSubject, refreshFavorites, removeFavorite } from '../services/favorites';
import { getIcon } from './Icons';
import { MainStack } from './MainStack';
import { PairingList } from './PairingList';
import { TalkingCow } from './TalkingCow';
import { urlPairing } from './urls';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoriteMenu(props: { node: VinOuFromage }) {
    const { node } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    }
    const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        removeFavorite(node);
        handleClose(event);
    };

    return <>
        <IconButton
            id="favorite-actions-button"
            aria-controls={open ? 'favorite-actions-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="favorite-actions-menu"
            aria-labelledby="favorite-actions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={handleDelete}><FavoriteIcon />Supprimer</MenuItem>
        </Menu>
    </>
}
function FavoriteItem(props: { node: VinOuFromage }) {
    const { node } = props;
    const icon = React.createElement(getIcon(node));
    const navigate = useNavigate();
    const doPairing = () => navigate(urlPairing(node.labels[0], node.identity.low));
    return (
        <Card onClick={doPairing}>
            <CardHeader
                avatar={
                    icon
                }
                action={
                    <FavoriteMenu node={node} />
                }
                title={node.properties.name}
            />
        </Card>
    )
}

export function FavoriteList(props: { favorites: VinOuFromage[] | null }) {
    const { favorites } = props
    if (favorites === null || !favorites) {
        return <PairingList expecting={3}></PairingList>
    }
    if (favorites.length === 0) {
        return <Box sx={{
            '& > :not(style)': {
                m: 3
            }
        }}><TalkingCow message={"Vous n'aimez rien."}></TalkingCow></Box>
    }

    return (<PairingList>
        {favorites.map((f, idx) => {
            return <FavoriteItem key={idx} node={f}></FavoriteItem>
        })}
    </PairingList>)
}

export function Favorites() {

    const [favorites, setFavorites] = React.useState<VinOuFromage[] | null>(null)
    React.useEffect(() => {
        const subscription = favoriteSubject.subscribe(f => {
            setFavorites([...f])
        })
        refreshFavorites();
        return () => subscription.unsubscribe();
    }, [])

    return (
        <MainStack>
            <FavoriteList favorites={favorites}></FavoriteList>
        </MainStack>
    )

}
