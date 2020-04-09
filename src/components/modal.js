import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export function TermsModal({openBool, closeCallback, clickCallback}) {
  return (
        <Dialog
            open={openBool}
            onClose={closeCallback}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" style={{fontWeight: "bold"}}>이용 약관 동의</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div>제1조(목적) <br/>
                본 회원약관은 URLink(이하 '갑'라 한다)이 운영하는 인터넷관련 서비스(이하 '서비스'라 한다)를 이용함에 있어 관리자와 이용자(이하 '회원'라 한다)의 권리, 의무 및 책임사항을 규정함을 목적으로 한다.
                <br/><br/>
                제2조 (약관의 효력) <br/>
                1.본 약관은 '갑'에 회원 가입 시 회원들에게 통지함으로써 효력을 발생합니다.
                2.'갑'은 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
                3.약관의 변경사항 및 내용은 '갑'의 홈페이지에 게시하는 방법으로 공시합니다.
                <br/><br/>
                제3조 (약관 이외의 준칙)<br/>
                이 약관에 명시되지 않은 사항이 전기 통신 기본법, 전기통신 사업법, 기타 관련 법령에 규정되어 있는 경우 그 규정에 따릅니다.
                ...
                </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={clickCallback} color="primary" style={{fontWeight: "bold"}}>
                동의안함
                </Button>
                <Button onClick={clickCallback} color="primary" autoFocus style={{fontWeight: "bold"}}>
                동의함
                </Button>
            </DialogActions>
        </Dialog>
  );
}



