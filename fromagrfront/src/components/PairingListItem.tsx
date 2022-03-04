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
import { Fromage, fromagePropertiesKeys, isFromage, isVin, Vin, VinOuFromage, vinPropertiesKeys } from '../interfaces/Fromage';
import { getIcon } from './Icons';
import { GraphNode } from '../interfaces/GraphNode';
import { urlPairing } from './urls';
import { useEffect } from 'react';
import { FromageService } from '../services/fromage.service';
import { addFavorite, isFavorite } from '../services/favorites.service';
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import { useNavigate } from 'react-router-dom';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { getImageUrl } from '../services/api.service';
const fromageService = new FromageService()

function renderString(prop: any) {
    if (prop instanceof Array) {
        return prop.join(', ')
    }
    return prop;
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
function defaultPropertiesRender(propertiesKeys: string[], propertiesValues: any[]) {
    const { t } = useTranslation();
    return propertiesValues.map((values, idx) => {
        return (<Stack spacing={1} key={idx}>
            <Typography key='title' variant='h5'>{t(propertiesKeys[idx])}</Typography>
            <Typography key='value' paragraph>
                {renderString(values)}
            </Typography>
        </Stack>)
    })
}

function VinPropertiesRender(props: { graphNode: Vin }) {
    const { graphNode } = props;
    const [related, setRelated] = React.useState<Fromage[] | null>(null)
    useEffect(() => {
        fromageService.awaitRelatedVin(graphNode.identity.low, setRelated)
    }, [])
    console.log("VinPropertiesRender related", related);

    const relatedRender = related
        ? linkPropertiesRender([["Cépages ou appellations", related]])
        : [1, 2, 3].map((i) => <Skeleton key={i}></Skeleton>)
    const propertiesValues = vinPropertiesKeys.map((key) => graphNode.properties[key]);
    const content = [
        defaultPropertiesRender(vinPropertiesKeys, propertiesValues),
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

    const propertiesValues = fromagePropertiesKeys.map((key) => graphNode.properties[key]);

    const content = [
        defaultPropertiesRender(fromagePropertiesKeys, propertiesValues),
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
    const properties =
        isFromage(graphNode) ? <FromagePropertiesRender graphNode={graphNode as Fromage}></FromagePropertiesRender>
            : isVin(graphNode) ? <VinPropertiesRender graphNode={graphNode as Vin}></VinPropertiesRender>
                : defaultPropertiesRender(Array.from(Object.keys(graphNode.properties)),
                    Array.from(Object.values(graphNode.properties)));
    return <CardContent>
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
    const navigate = useNavigate();
    const [fav, setFav] = React.useState(isFavorite(graphNode));
    const [expanded, setExpanded] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    React.useEffect(() => {
        getImageUrl(graphNode.properties.wikidata_id).then((imageUrl: string) => {
            console.log('imageUrl', imageUrl);
            if (imageUrl) {
                setImageUrl(imageUrl[0])
                console.log("success")
            }
        })
    }, []
    )
    const favorite = <IconButton onClick={() => { addFavorite(graphNode); setFav(true); }} >
        {fav ? <CheckIcon /> : <FavoriteIcon />}
    </IconButton>
    // const moreInfo = <IconButton onClick={() => navigate(urlPairing(graphNode.labels[0], graphNode.identity.low))}>
    //     <ShortcutIcon />
    // </IconButton>
    const moreInfo = <a href={urlPairing(graphNode.labels[0], graphNode.identity.low)}>
        <ShortcutIcon />
    </a>

    const cardHeader = getCardHeader(graphNode, { expanded, onClick: () => setExpanded(!expanded), fav })
    const cardContent = getCardContent(graphNode)

    return (
        <Card key={graphNode.identity.low}>
            {cardHeader}
            {imageUrl ? <CardMedia
                component='img'
                image={imageUrl}
                alt={imageUrl}
            /> : <></>}
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


