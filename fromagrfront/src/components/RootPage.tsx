import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function RootPage(){
    const navigate = useNavigate();
    React.useEffect(()=>navigate('/f/search'), [])

    return (<></>)
}