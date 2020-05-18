import React from 'react';
import checkTrue from '../images/check-true.png';
import checkFalse from '../images/check-false.png';

 // eslint-disable-next-line
const emailExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

function checkPassword(passsword) {
    var num = passsword.search(/[0-9]/g);
    var eng = passsword.search(/[a-z]/ig);
    var spe = passsword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (passsword.length < 8 || passsword.length > 20) {
        return {check:true, msg:"8자리 ~ 20자리 이내로 입력해주세요."};
    } else if (passsword.search(/\s/) !== -1) {
        return {check:true, msg:"비밀번호는 공백 없이 입력해주세요."};
    } else if (num < 0 || eng < 0 || spe < 0) {
        return {check:true, msg:"영문,숫자, 특수문자를 혼합하여 입력해주세요."};
    } else {
        return {check:false, msg:"올바른 비밀번호 양식입니다."};
    }
}

export const singupAlertCheck = {
    username: (name) => {
        if (name.length > 8) return {check: true, msg: "8자 이내로 작성해주세요."};
        else return {check: false, msg:""};
    },
    email: (email) => {
        if(!email.match(emailExp)) return {check: true, msg: "올바르지 않은 이메일 양식입니다."};
        else return {check: false, msg:"올바른 이메일 양식입니다."};
    },
    password: (password) => {
        return checkPassword(password);
    },
    rePassword: (password,rePassword) => {
        if(password !== rePassword) return {check:true, msg:"비밀번호가 일치하지 않습니다."};
        else return {check:false, msg:"비밀번호가 일치합니다."};
    }
};

export const singupAlert = {
    UserNameFalse: (msg) => {
        return (
            <div className="check-idpw nickname-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                {msg}
            </div>
        );
    },
    EmailTrue: (msg) => {
        return (
            <div className="check-idpw id-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                {msg}
            </div>
        );
    },
    EmailFalse: (msg) => {
        return (
            <div className="check-idpw id-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                {msg}
            </div>
        );
    },
    PasswordTrue: (msg) => {
        return (
            <div className="check-idpw pw-true">
                <span><img src={checkTrue} alt="check true"></img></span>
                {msg}
            </div>
        );
    },
    PasswordFalse: (msg) => {
        return (
            <div className="check-idpw pw-false">
                <span><img src={checkFalse} alt="check false"></img></span>
                {msg}
            </div>
        )
    }
};