import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Link, Skeleton, Stack } from '@mui/material';
import { Fromage, FromageProperties, isFromage, isVin, Vin, VinOuFromage, VinProperties } from '../interfaces/Fromage';
import { useNavigate } from 'react-router-dom';
import { getIcon } from './Icons';
import { GraphNode } from '../interfaces/GraphNode';
import { urlPairing } from './urls';
import { useEffect } from 'react';
import { FromageService } from '../services/fromage.service';


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
            return <></>
        }
        return (
            <Stack spacing={1} key={title}>
                <Typography variant='h5'>{title}</Typography>
                <Stack spacing={1}>
                    {graphNodes.map((link) => <RenderLink key={link.identity.low} graphNode={link} ></RenderLink>)}
                </Stack>
            </Stack>
        )
    });

}
function defaultPropertiesRender(propertiesGroups: [string, any][]) {
    return propertiesGroups.map(([title, values]) => {
        return (<Stack spacing={1} key={title}>
            <Typography variant='h5'>{title}</Typography>
            <Typography paragraph>
                {renderString(values)}
            </Typography>
        </Stack>)
    })
}

function VinPropertiesRender(props: { graphNode: Vin }) {
    const { graphNode } = props;
    const propertiesGroups = Array.from(Object.entries(graphNode.properties));
    return (
        <Stack spacing={3}>
            {defaultPropertiesRender(propertiesGroups)}
            {linkPropertiesRender([["En savoir plus", [graphNode]]])}
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
    return (
        <Stack spacing={3}>
            {defaultPropertiesRender(Array.from(Object.entries(graphNode.properties)))}
            {linkPropertiesRender([["En savoir plus", [graphNode]]])}
            {relatedRender}
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

export function PairingListItem(props: { graphNode: VinOuFromage }) {
    const { graphNode } = props;
    const [expanded, setExpanded] = React.useState(false);
    const title = graphNode.properties.name;
    const properties =
        isFromage(graphNode) ? <FromagePropertiesRender graphNode={graphNode as Fromage}></FromagePropertiesRender>
            : isVin(graphNode) ? <VinPropertiesRender graphNode={graphNode as Vin}></VinPropertiesRender>
                : defaultPropertiesRender(Array.from(Object.entries(graphNode.properties)));
    const IconComponent = getIcon(graphNode);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    React.createElement(IconComponent)
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                }
                title={title}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {properties}
                </CardContent>
            </Collapse>
        </Card>
    )
}

