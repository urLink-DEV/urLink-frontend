const emailExp = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

function checkPassword(passsword) {
  var num = passsword.search(/[0-9]/g)
  var eng = passsword.search(/[a-z]/ig)
  
  if (passsword.length < 6 || passsword.length > 20) {
    return {check:true, msg:"8자리 ~ 20자리 이내로 입력해주세요."}
  } else if (passsword.search(/\s/) !== -1) {
    return {check:true, msg:"비밀번호는 공백 없이 입력해주세요."}
  } else if (num < 0 || eng < 0 ) {
    return {check:true, msg:"영문,숫자를 혼합하여 입력해주세요."}
  } else {
    return {check:false, msg:"올바른 비밀번호 양식입니다."}
  }
}

const singupAlertCheck = {
  username: (name) => {
    if (!name) return { check: true, msg: "" }
    else if (name.length > 8) return {check: true, msg: "8자 이내로 작성해주세요."}
    else return {check: false, msg:""}
  },
  email: (email) => {
    if (!email) return { check: true, msg: "" }
    else if(!email.match(emailExp)) return {check: true, msg: "올바르지 않은 이메일 양식입니다."}
    else return {check: false, msg:"올바른 이메일 양식입니다."}
  },
  password: (password) => {
    if (!password) return { check: true, msg: "" }
    return checkPassword(password)
  },
  rePassword: (password,rePassword) => {
    if (!rePassword) return { check: true, msg: "" }
    else if(password !== rePassword) return {check:true, msg:"비밀번호가 일치하지 않습니다."}
    else return {check:false, msg:"비밀번호가 일치합니다."}
  }
}

export default singupAlertCheck