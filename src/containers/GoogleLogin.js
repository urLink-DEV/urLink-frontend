import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = response => {
    console.log(response);
}

export default function() {
    return (
        <GoogleLogin 
            clientId=''
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'} />            
    )
}