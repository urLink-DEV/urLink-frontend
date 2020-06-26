import { makeStyles } from '@material-ui/core/styles'
import mainBackground from '../../images/mainBackground2.png'

const useStyles = makeStyles(theme => ({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none !important'
    },
    overflow: 'hidden',
    padding: '40px',
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${mainBackground}), linear-gradient(to top, #0260d8, #157cff 68%)`,
    backgroundSize: '100%',
  },    

  titleCenter: {
    // paddingTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: '100%'
  },
  imgCenter: {
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSize:{
    width: '100%'
  },
  getStartBtn: {
    marginTop: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '48px',
    borderRadius: '40px',
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ffffff',
    textDecoration: 'none'
  },
  getStartText: {
    fontFamily: 'SpoqaHanSans',
    fontSize: '24px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  getStart_1: {
    color: '#212529'
  },
  getStart_2: {
    color: '#358eff'
  },
  textGrp: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '10px'
  },
  text_1: {
    textAlign: 'center',
    height: '29px'
  },
  text_2: {
    textAlign: 'center',
    height: '20px'
  },
  text: {
    fontFamily: 'SpoqaHanSans',
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.47px',
    color: '#ffffff',
  },
  textBold: {
    fontWeight: 'bold'
  },
  contentGroup: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  swiper : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "700px !important",
    // height: "100% !important"
  }
}))

export default useStyles