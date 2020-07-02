import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import alertIcon from '../images/logo/group-2.svg'


const useStyles = makeStyles((theme) => ({
  termsModal:{
    width:'600px',
    height: '500px'
  },
  alertModal: {
    lignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontWeight:'bold'
  },
  alertIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  alertModalBtn: {
    width:'100%'
  }
}))

export function TermsModal({ openBool, onClose, onClick }) {
  return (
    <Dialog
        open={openBool}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs" 
    >
      <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>이용 약관 동의</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
              &lt;유어링크&gt;('urLink'이하 'urLink')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.<br/>
              &lt;유어링크&gt;('urLink') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.<br/>
              ○ 본 방침은부터 2020년 6월 27일부터 시행됩니다.<br/>
              1. 개인정보의 처리 목적 &lt;유어링크&gt;('urLink'이하 'urLink')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.<br/>
              가. 홈페이지 회원가입 및 관리<br/>
              회원 가입의사 확인, 회원자격 유지·관리 등을 목적으로 개인정보를 처리합니다.
              <br/><br/>
              나. 재화 또는 서비스 제공<br/>
              서비스 제공 등을 목적으로 개인정보를 처리합니다.
              <br/><br/><br/>
              2. 개인정보 파일 현황<br/>
              1. 개인정보 파일명 : 회원정보<br/>
              - 개인정보 항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보<br/>
              - 수집방법 : 홈페이지<br/>
              - 보유근거 : 사용자에게 url 보관 및 정리 서비스를 제공하기 위해 필수로 수집해야만 하는 항목<br/>
              - 보유기간 : 사용자 요구가 있을 때 지체없이 파기<br/>
              <br/><br/><br/>
              3. 개인정보의 처리 및 보유 기간
              <br/><br/>
              ① &lt;유어링크&gt;('urLink')은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.
              <br/><br/>
              ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/>
              1.&lt;홈페이지 회원가입 및 관리&gt;<br/>
              &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;회원 탈퇴 시 파기&gt;까지 위 이용목적을 위하여 보유.이용됩니다.<br/>
              -보유근거 : 사용자에게 url 보관 및 정리 서비스를 제공하기 위해 필수로 수집해야만 하는 항목<br/><br/>
              2.&lt;재화 또는 서비스 제공&gt;<br/>
              &lt;재화 또는 서비스 제공&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터 사용자의 요구가 있거나 회원 탈퇴 시 파기 까지 위 이용목적을 위하여 보유.이용됩니다.<br/>
              -보유근거 : 사용자에게 url 보관 및 정리 서비스를 제공하기 위해 필수로 수집해야만 하는 항목
              <br/><br/><br/>
              4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.<br/>
              ① 정보주체는 유어링크에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
              ② 제1항에 따른 권리 행사는유어링크에 대해 개인정보 보호법 시행령 제41조제1항에 따라 전자우편을 통하여 하실 수 있으며 유어링크은(는) 이에 대해 지체 없이 조치하겠습니다.<br/>
              ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
              ④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
              ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/>
              ⑥ 유어링크은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
              <br/><br/><br/>
              5. 처리하는 개인정보의 항목 작성
              <br/><br/>
              ① &lt;유어링크&gt;('urLink'이하 'urLink')은(는) 다음의 개인정보 항목을 처리하고 있습니다.<br/>
              1 &lt;재화 또는 서비스 제공&gt;
              - 필수항목 : 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보<br/>
              <br/><br/><br/>
              6. 개인정보의 파기&lt;유어링크&gt;('urLink')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
              -파기절차<br/>
              이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
              <br/><br/>
              -파기기한<br/>
              이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.<br/>
              -파기방법<br/>
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.<br/>
              <br/><br/><br/>
              7. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항<br/>
              ① 유어링크 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br/>
              ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
              <br/><br/><br/>
              8. 개인정보 보호책임자 작성
              <br/><br/>
              ① 유어링크(‘urLink’이하 ‘urLink) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              <br/><br/>
              ▶ 개인정보 보호책임자<br/>
              성명 :박건우<br/>
              직책 :팀장<br/>
              직급 :팀장<br/>
              연락처 :gunwoo.yapp@gmail.com<br/>
              ※ 개인정보 보호 담당부서로 연결됩니다.
              <br/><br/>
              ▶ 개인정보 보호 담당부서<br/>
              부서명 : 개인정보부서<br/>
              담당자 : 박건우<br/>
              연락처 : gunwoo.yapp@gmail.com<br/>
              ② 정보주체께서는 유어링크(‘urLink’이하 ‘urLink) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 유어링크(‘urLink’이하 ‘urLink) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
              <br/><br/><br/>
              9. 개인정보 처리방침 변경<br/>
              ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              <br/><br/><br/>
              10. 개인정보의 안전성 확보 조치 &lt;유어링크&gt;('urLink')은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.<br/>
              1. 개인정보 취급 직원의 최소화 및 교육<br/>
              개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.<br/>
              <br/><br/>
              2. 내부관리계획의 수립 및 시행<br/>
              개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
              <br/><br/>
              3. 해킹 등에 대비한 기술적 대책<br/>
              &lt;유어링크&gt;('urLink')은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
              <br/><br/>
              4. 개인정보의 암호화<br/>
              이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
              <br/><br/>
              5. 접속기록의 보관 및 위변조 방지<br/>
              개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick} color="primary" autoFocus style={{ fontWeight: "bold" }} value={1}>
          동의함
        </Button>
        <Button onClick={onClick} color="primary" style={{ fontWeight: "bold" }} value={0}>
          동의안함
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function AlertModal({ btnText, modalText, openBool, onClose, onClickOk }) {
    const btnCreate = btnText ? true : false
    const classes = useStyles()
    return (
      <Dialog
      open={openBool}
      onClose={onClose}
      aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.alertModal}>
            <img className={classes.alertIcon} src={alertIcon} alt='alert-icon'></img>
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" className={classes.alertModalBtn}>
            닫기
          </Button>
        {btnCreate ?
          <Button onClick={onClickOk} color="primary" className={classes.alertModalBtn} autoFocus >
            {btnText}
          </Button>
          : ""}
        </DialogActions>
      </Dialog>
    )
}