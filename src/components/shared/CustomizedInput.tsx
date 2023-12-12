import { TextField } from '@mui/material';

type Props = {
    name: string
    type: string
    label: string
}

const CustomizedInput = (props: Props) => {
    return <TextField margin='normal' InputLabelProps={{ style: { color: 'white'}}} InputProps= {{ 
        style: {color: 'white',
        width: '400px', 
        borderRadius: '10px',
        fontSize: '20px',
     }}}  name={props.name} type={props.type} label={props.label}/>
}

export default CustomizedInput;