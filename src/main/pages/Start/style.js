import { makeStyles } from '@material-ui/core/styles'

import mainBackground from '@assets/images/mainBackground2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none !important',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  getStartBtn: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '48px',
    borderRadius: '40px',
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ffffff',
    textDecoration: 'none',
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
  textBlack: {
    color: '#212529',
  },
  textBlue: {
    color: '#358eff',
  },
  textGrp: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  textCenter: {
    textAlign: 'center',
    height: '29px',

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
    fontWeight: 'bold',
  },
  imgCenter: {
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAutoSize: {
    width: '100%',
  },
}))

export default useStyles
