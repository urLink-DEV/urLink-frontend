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
    fontSize: 16,
    maxWidth: '60%',
    color: '#212529',
    padding: 18,
    height: 58,
  },
  selectedTitle: {
    color: '#2083ff',
    fontWeight: 'bold',
    maxWidth: '65%',
  },
  selectedItem: {
    fontSize: 16,
    boxShadow: ' 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #2083ff',
    borderRadius: '4px',
  },
  modifying: {
    boxShadow: ' 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #3cb043',
    borderRadius: '4px',
  },
  urlCountBox: {
    display: 'inline-block',
    fontSize: 12,
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
      zIndex: 1,
    },
    '& > div > span': {
      color: '#fff !important',
      zIndex: 1,
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 0,
      opacity: 1,
      backgroundImage: 'linear-gradient(271deg, #e0f6ff, #2083ff)',
      borderRadius: '4px',
      animationFillMode: 'none',
      animation: `$dragFinished 0.7s ease-in-out forwards 1`,
      '&::transform-origin': '100% 0%',
      '&::animation': `$dragFinished 0.7s ease-in-out forwards 1`,
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
  },
}))

export default useStyles
