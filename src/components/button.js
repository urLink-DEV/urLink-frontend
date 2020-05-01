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

export function AgreeBtn() {
    const [bool, setBool] = React.useState(false);
    const changeBool = () => {
        setBool(prevBool => !prevBool);
    };

  return (
    <FormControlLabel 
        value="이메일 수신 동의" 
        label="이메일 수신 동의" 
        className="text-agree"
        control={<Radio color="primary" checked={bool} onClick={changeBool} />}
        />
  );
}

export function TermsBtn({callback}) {
    return (
        <Button variant="outlined" color="primary" onClick={callback}>
          약관보기
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

