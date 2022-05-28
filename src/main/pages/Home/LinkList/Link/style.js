import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 300,
    height: 348,
  },
  editableCard: {
    border: '1px solid #3cb043',
  },
  selectedCard: {
    border: '1px solid #2083ff',
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
  editIcon: {
    marginLeft: 'auto',
  },
  alarmIconActive: {
    color: '#fdd835',
  },
  dateTimePicker: {
    display: 'none',
  },
})

export default useStyles
