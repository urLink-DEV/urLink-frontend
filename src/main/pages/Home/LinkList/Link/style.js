import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  root: {
    position: 'relative',
    width: 300,
    height: 348,
    marginTop: 50,
    marginRight: 36,
    // [theme.breakpoints.up('sm')]: {},
    // [theme.breakpoints.up('md')]: {},
    // [theme.breakpoints.up('lg')]: {},
    // [theme.breakpoints.up('xl')]: {},

    '&:hover': {
      transform: 'translateY(-12px)',
      transition: 'transform 0.5s',
    },
  },
  selectedCard: {
    backgroundColor: 'rgba(29, 120, 255, 0.1)',
  },
  checkbox: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    '&.Mui-checked': {
      color: 'white',

      '& > .MuiSvgIcon-root': {
        backgroundColor: '#1D78FF',
        borderRadius: 4,
      },
    },
    '& > .MuiSvgIcon-root': {
      backgroundColor: 'rgba(129, 147, 174, 0.4)',
      borderRadius: 4,
    },
  },
  urlBox: {
    display: 'flex',
    alignItems: 'center',
  },
  urlFavicon: {
    paddingBottom: 8,
  },
  urlSubFont: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    letterSpacing: -0.6,
    paddingLeft: 8,
    paddingBottom: 8,
  },
  newTabIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 0,
  },
  cardContent: {
    height: 182,
    padding: '20px 16px 0 16px',
  },
  contentTitleEditable: {
    width: '100%',
    overflow: 'hidden',
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: '#F6F6F6',
    borderRadius: 4,
  },
  contentDescEditable: {
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    width: '100%',
    maxHeight: 65,
    fontSize: 14,
    whiteSpace: 'pre-line',
    lineClamp: 3,
    backgroundColor: '#F6F6F6',
    borderRadius: 4,
  },
  contentTitle: {
    width: '100%',
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
    lineClamp: 2,
    maxHeight: 50,
    fontSize: 16,
    marginBottom: 4,
  },
  contentDesc: {
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    width: '100%',
    maxHeight: 65,
    fontSize: 14,
    whiteSpace: 'pre-line',
    lineClamp: 3,
  },
  cardActions: {
    padding: '0 16px 20px 16px',
    // '& .MuiIconButton-root': {
    //   padding: 3,
    // },
  },
  copyIcon: {
    width: 18,
    height: 18,
  },
  // editIcon: {
  //   marginLeft: 'auto',
  // },
  doneIcon: {
    marginLeft: 'auto',
  },
  unionIcon: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
  menuIconImg: {
    width: 30,
    height: 20,
    paddingRight: 10,
  },
  alarmIconActive: {
    color: '#fdd835',
  },
  dateTimePicker: {
    display: 'none',
  },
}))

export default useStyles
