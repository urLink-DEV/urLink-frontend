import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
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
  },
  selectedCard: {
    backgroundColor: 'rgba(29, 120, 255, 0.1)',
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
  contentTitle: {
    maxHeight: 50,
    fontSize: 16,
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
})

export default useStyles
