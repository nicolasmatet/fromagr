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
import { Stack } from '@mui/material';



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

export function PairingListItem(props: { IconComponent: any, title: string, properties?: any }) {
    const { IconComponent, title, properties } = props;
    const [expanded, setExpanded] = React.useState(false);

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
            {/* <CardContent>
                <Typography variant="body2" color="text.secondary">
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions> */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Stack spacing={3}>
                        {Array.from(Object.keys(properties)).map((propKey) => {
                            return (
                                <Stack key={propKey}>
                                    <Typography variant='h5'>{propKey}</Typography>
                                    <Typography paragraph>
                                        {renderProperty(properties[propKey])}
                                    </Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    )
}

function renderProperty(prop:any){
    if (prop instanceof Array){
        return prop.join(', ')
    }
    return prop
}