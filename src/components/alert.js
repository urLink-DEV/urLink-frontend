import React from 'react';
import checkTrue from '../images/check-true.png';
import checkFalse from '../images/check-false.png';

const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const passRegExp = /^[0-9a-zA-Z!@#$%^&*()_+=]{9,20}$/i;

export const singupAlertCheck = {
    userName: (name) => {
        if (name.length > 8) return true;
        else return false;
    },
    email: (email) => {
        if(!email.match(regExp)) return true;
        else return false;
    }
};

export const singupAlert = {
    
    userNameFalse: () => {
        return (
            <div className="check-idpw nickname-false">
                <span>8자 이내로 작성해주세요.</span>
            </div>
        );
    },
    emailTrue: () => {
        return (
            <div className="check-idpw id-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                <span>올바른 이메일 양식입니다.</span>
            </div>
        );
    },
    emailFalse: () => {
        return (
            <div className="check-idpw id-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                <span>올바르지 않은 이메일 양식입니다.</span>
            </div>
        );
    },
    passwordTrue: () => {
        return (
            <div className="check-idpw pw-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                <span>올바른 비밀번호 양식입니다.</span>
            </div>
        );
    },
    passwordFalse: () => {
        return (
            <div className="check-idpw pw-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                <span>올바르지 않은 비밀번호 양식입니다.</span>
            </div>
        )
    }

};