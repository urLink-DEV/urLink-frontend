import { makeStyles } from '@material-ui/styles'

import mainBackground from '@assets/images/mainBackground2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    padding: 40,
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${mainBackground}), linear-gradient(to top, #0260d8, #157cff 68%)`,
    backgroundSize: '100%',
    '&::-webkit-scrollbar': {
      display: 'none !important',
    },
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
    fontSize: '24px',
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  textCenter: {
    textAlign: 'center',
    height: 29,

    fontSize: 15,
    letterSpacing: -0.47,
    color: '#ffffff',
  },
  textBold: {
    fontWeight: 'bold',
  },
  imgCenter: {
    paddingTop: 20,
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
