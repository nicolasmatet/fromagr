import { Link, Stack, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { WikiData } from './backgrounds/WikiData';
import { urlAttributions } from './urls';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CowIcon } from './Icons';

function IconLink(props: any) {
    const { icon, href, text } = props;
    return <Link style={{ display: 'flex', alignItems: 'center' }}
        variant="caption" href={href} >
        {icon}
        < span style={{ lineHeight: 0, marginLeft:'0.5ch' }} > {text}
        </span >
    </Link >

}
export function Footer() {
    const theme = useTheme();
    return <Stack direction='row' spacing={1} sx={{
        justifyContent: "space-around",
        paddingTop: 1,
        alignItems: "start"
    }}>
        <Stack direction='column' spacing={1}>
            <IconLink href="https://github.com/nicolasmatet" icon={<GitHubIcon />} text="GitHub"></IconLink>
            <IconLink href="https://www.linkedin.com/in/nicolas-matet-644237a3/" icon={<LinkedInIcon />} text="LinkedIn"></IconLink>
        </Stack >
        <Stack direction='column' spacing={1} sx={{ alignItems: 'start' }}>
            <IconLink href={urlAttributions()} icon={<CowIcon />} text="Attributions"></IconLink>
            <div>
                <WikiData />
            </div>
        </Stack>

    </Stack >

}