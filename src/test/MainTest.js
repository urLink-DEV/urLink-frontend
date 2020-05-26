import React , {useState} from "react";
import auth from '../commons/apis/auth';
import LoginTest from './LoginTest';

function MainTest() {
    const [login, setLogin] = useState(false);

    if(login){
        return <LoginTest/>;
    }

    (async () => {
        const check = await auth.tokenCheck();
        if(!check) setLogin(true);
    })();

    return (
        <div>
            <h1>Main Test JWT 토큰 반응 확인</h1>
            로그인 상태면 볼 수 있어요.
        </div>
    );
}

export default MainTest;