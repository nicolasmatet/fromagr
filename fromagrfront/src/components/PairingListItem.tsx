import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { CardActions, CardMedia, Link, Skeleton, Stack } from '@mui/material';
import { Fromage, isFromage, isVin, Vin, VinOuFromage } from '../interfaces/Fromage';
import { getIcon } from './Icons';
import { GraphNode } from '../interfaces/GraphNode';
import { urlPairing } from './urls';
import { useEffect } from 'react';
import { FromageService } from '../services/fromage.service';
import { addFavorite, isFavorite } from '../services/favorites.service';
import { useTranslation } from "react-i18next";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { getImageUrl } from '../services/api.service';
import { ProgressiveImg } from './backgrounds/ProgressiveImg';
import { useNavigate } from 'react-router-dom';
const fromageService = new FromageService()

function renderString(key: string, values: string[] | string) {
    const { t } = useTranslation()
    if (values instanceof Array) {
        return values.map(v => t(key + '.' + v)).join(', ')
    }
    return t(key + '.' + values);
}

function RenderLink(props: { graphNode: GraphNode<any> }) {
    const { graphNode } = props;
    return <Link href={urlPairing(graphNode.labels[0], graphNode.identity.low)}>
        <Stack direction="row" gap={1}>
            {React.createElement(getIcon(graphNode))}
            {graphNode.properties.name}
        </Stack>
    </Link>;
}

function linkPropertiesRender(linksGroups: [string, GraphNode<any>[]][]) {
    return linksGroups.map(([title, graphNodes]) => {
        if (!graphNodes || graphNodes.length === 0) {
            return null
        }
        return (
            <Stack spacing={1} key={title}>
                <Typography key='title' variant='h5'>{title}</Typography>
                <Stack key='links' spacing={1}>
                    {graphNodes.map((link) => <RenderLink key={link.identity.low} graphNode={link} ></RenderLink>)}
                </Stack>
            </Stack>
        )
    });

}
function defaultPropertiesRender(propertiesKeys: string[], graphNode: GraphNode<any>,) {
    return (<Stack spacing={1}>
        {propertiesKeys.map((key) => {
            return <Typography key={key} variant='body1'>
                {renderString(key, graphNode.properties[key])}
            </Typography>
        })}
    </Stack>)
}

function VinPropertiesRender(props: { graphNode: Vin }) {
    const { graphNode } = props;
    const [related, setRelated] = React.useState<Fromage[] | null>(null)
    useEffect(() => {
        fromageService.awaitRelatedVin(graphNode.identity.low, setRelated)
    }, [])
    const relatedRender = related
        ? linkPropertiesRender([["Cépages ou appellations", related]])
        : [1, 2, 3].map((i) => <Skeleton key={i}></Skeleton>)
    const content = [
        <Typography key={'lait'} variant='body1'>
            {React.createElement(getIcon(graphNode))}
            {renderString('couleur', graphNode.properties.couleur)}
        </Typography>,
        ...(relatedRender ? [relatedRender] : [])
    ]
    return (
        <Stack key='props' spacing={3}>
            {...content}
        </Stack>)
}

function FromagePropertiesRender(props: { graphNode: Fromage }) {
    const { graphNode } = props;
    const [related, setRelated] = React.useState<Fromage[] | null>(null)
    useEffect(() => {
        fromageService.awaitRelatedFromage(graphNode.identity.low, setRelated)
    }, [])
    const relatedRender = related
        ? linkPropertiesRender([["Fromages associés", related]])
        : [1, 2, 3].map((i) => <Skeleton key={i}></Skeleton>)
    const content = [
        <Typography key={'lait'} variant='body1'>
            {React.createElement(getIcon(graphNode))}
            {renderString('lait', graphNode.properties.lait)}
        </Typography>,
        ...(relatedRender ? [relatedRender] : [])
    ]
    return (
        <Stack key='props' spacing={3}>
            {...content}
        </Stack>
    )
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function getCardContent(graphNode: VinOuFromage) {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    React.useEffect(() => {
        getImageUrl(graphNode.properties.wikidata_id).then((imageUrl: string) => {
            console.log('imageUrl', imageUrl);
            if (imageUrl && imageUrl[0] && imageUrl[0] !== '') {
                setImageUrl(imageUrl[0])
                console.log("success")
            } else {
                setImageUrl('noImage')
            }
        })
    }, []
    )
    const cardMedia = imageUrl !== 'noImage' ?
        <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ paddingBottom: '100%' }}>
            </div>
            <ProgressiveImg
                style={{ position: 'absolute', top: 0 }}
                src={imageUrl}
                alt={imageUrl}
            />
        </div>
        : <></>

    const properties =
        isFromage(graphNode) ? <FromagePropertiesRender graphNode={graphNode as Fromage}></FromagePropertiesRender>
            : isVin(graphNode) ? <VinPropertiesRender graphNode={graphNode as Vin}></VinPropertiesRender>
                : defaultPropertiesRender(Array.from(Object.keys(graphNode.properties)), graphNode)
    return <CardContent>
        {cardMedia}
        {properties}
    </CardContent>
}



function getCardHeader(graphNode: VinOuFromage, props: any) {
    const { expanded, onClick, fav } = props;
    const IconComponent = getIcon(graphNode);
    return <CardHeader
        onClick={onClick}
        avatar={React.createElement(IconComponent)}
        action={
            <>
                {fav ? <IconButton><FavoriteIcon /></IconButton> : <></>}
                <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </>
        }
        title={graphNode.properties.name}
    />
}
export function PairingListItem(props: { graphNode: VinOuFromage }) {
    const { graphNode } = props;
    const [fav, setFav] = React.useState(isFavorite(graphNode));
    const [expanded, setExpanded] = React.useState(false);

    const favorite = <IconButton onClick={() => { addFavorite(graphNode); setFav(true); }} >
        {fav ? <CheckIcon /> : <FavoriteIcon />}
    </IconButton>
    const moreInfo = <a href={urlPairing(graphNode.labels[0], graphNode.identity.low)}>
        <ShortcutIcon />
    </a>
    const cardHeader = getCardHeader(graphNode, { expanded, onClick: () => setExpanded(!expanded), fav })
    const cardContent = getCardContent(graphNode)

    return (
        <Card key={graphNode.identity.low}>
            {cardHeader}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {cardContent}
                <CardActions sx={{ justifyContent: 'end' }}>
                    {moreInfo}
                    {favorite}
                </CardActions>
            </Collapse>
        </Card>
    )
}


