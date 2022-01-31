import { IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import CloseIcon from '@mui/icons-material/Close';

export function TextFieldWithClear(props: any) {
    const { onChange, label, ...rest } = props

    const [searchText, setSearchText] = React.useState("")
    const inputEl = React.useRef<HTMLInputElement>(null);

    const iconClear = searchText ? (<IconButton style={{ position: 'absolute' }} color='primary' onClick={clearInput} > <CloseIcon></CloseIcon> </IconButton>) : <></>

    function clearInput() {
        setSearchText('')
        onChange({ target: { name: inputEl.current?.name, value: '' } })
    }

    return (
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: 'end' }}>
            <TextField sx={{ bgcolor: 'background.paper' }} id="outlined-basic" label={label} variant="outlined"
                ref={inputEl} onChange={(e) => { setSearchText(e.target.value); onChange(e) }}
                value={searchText} />
            {iconClear}
        </Stack>
    )
}