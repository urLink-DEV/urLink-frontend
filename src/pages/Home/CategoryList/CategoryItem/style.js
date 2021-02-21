import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTab: {
    display: 'block',
    width: 208,
    borderRadius: 4,
    padding: '0 !important',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
    },
    margin: '10px auto',
    outline: 'none',
  },
  title: {
    fontFamily: 'SpoqaHanSans',
    fontSize: 16,
    maxWidth: '60%',
    color: '#212529',
    padding: 18,
  },
  selectedTitle: {
    color: '#2083ff',
    fontWeight: 'bold',
  },
  selectedItem: {
    fontSize: 16,
    boxShadow:
      ' 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #2083ff',
    borderRadius: '4px',
  },
  modifying: {
    boxShadow:
      ' 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #3cb043',
    borderRadius: '4px',
  },
  urlCountBox: {
    display: 'inline-block',
    fontSize: 12,
    fontFamily: 'SpoqaHanSans',
    color: '#868e96',
    textAlign: 'center',
  },
  favoriteStar: {
    marginRight: '8px',
  },
  block: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
  marginRight: {
    marginRight: '8px',
  },
  linkBox: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '40%',
  },
  dragFinished: {
    position: 'relative',
    fontWeight: 'bold',
    '& > :first-child': {
      color: '#fff !important',
    },
    '& > div > span': {
      color: '#fff !important',
    },
    backgroundImage: 'linear-gradient(271deg, #e0f6ff, #2083ff)',
    borderRadius: '4px',
    animationFillMode: 'none',
    animation: `$dragFinished 0.7s ease-in-out forwards 1`,
    '&::-webkit-transform-origin': '100% 0%',
    '&::transform-origin': '100% 0%',
    '&::-webkit-animation': `$dragFinished 0.7s ease-in-out forwards 1`,
  },
  '@-webkit-keyframes dragFinished': {
    '0%': {
      width: 0,
    },
    '70%': {
      width: '100%',
      opacity: 1,
    },
    '90%': {
      opacity: 0,
      width: '100%',
    },
    '100%': {
      opacity: 0,
      width: 0,
    },
  },

  '@keyframes dragFinished': {
    '0%': {
      width: 0,
    },
    '70%': {
      width: '100%',
      opacity: 1,
    },
    '90%': {
      opacity: 0,
      width: '100%',
    },
    '100%': {
      opacity: 0,
      width: 0,
    },
    // '0%': {
    //   width: 0,
    // },
    // '70%': {
    //   width: '100%',
    //   opacity: 1,
    // },
    // '90%': {
    //   opacity: 0,
    //   width: '100%',
    // },
    // '100%': {
    //   opacity: 0,
    //   width: 0,
    // },
  },
}))

export default useStyles
