import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 208,
    height: 241,
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
    height: 80,
    padding: 5,
  },
  contentTitle: {
    height: 20,
    fontSize: 14,
  },
  contentDesc: {
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    width: '100%',
    height: 52,
    fontSize: 12,
    whiteSpace: 'pre-line',
    lineClamp: 3,
  },
  cardActions: {
    padding: 5,
    '& .MuiIconButton-root': {
      padding: 3,
    },
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
