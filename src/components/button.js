import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import LogoGoogle from '../images/logo-google.png';


export function GoogleLoginBtn({text, onClick}) {
    return (
        <Button className="btn-GoogleLogin" onClick={onClick} >
            <img className="logo-google" alt="URLink" src={LogoGoogle} />
            {text}
        </Button>
    );
}

export function OneRadioBtn({text, checked, onClick}) {
    // const [bool, setBool] = React.useState(false);
    // const changeBool = () => {
    //     setBool(prevBool => !prevBool);
    // };
    return (
        <FormControlLabel
            value={text}
            label={text}
            className="text-agree"
            control={<Radio color="primary" checked={checked} onClick={onClick} />}
        />
    );
}

export function NomalBtn({text, onClick}) {
    return (
        <Button variant="outlined" color="primary" onClick={onClick}>
          {text}
        </Button>
    );
}

// export function SigninupBoxBtn({text, onClick}) {
//     return (
//         <Button className="btn-SigninupBox" 
//           variant="contained" color="primary" onClick={onClick}>
//             {text}
//         </Button>
//     );
// }

// export function SigninupText({text}) {
//     return (
//         <Button className="btn-SigninupText" variant="text" color="primary">
//           {text}
//         </Button>
//     );
// }