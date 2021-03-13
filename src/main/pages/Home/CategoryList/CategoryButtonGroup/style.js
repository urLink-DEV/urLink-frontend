import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  addButton: {
    width: 208,
    height: 52,
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 10,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f1f3f5',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  deleteButton: {
    width: 208,
    height: 52,
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 10,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f1f3f5',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  block: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
  input: {
    padding: '0 12px',
    width: 122,
    height: 28,
    borderRadius: 4,
    marginRight: 4,
    marginLeft: 4,
    backgroundColor: '#f1f3f5',
    fontSize: 14,
  },
  okBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#2083ff',
    padding: 0,
    minWidth: 0,
    color: '#fff',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#2083ff',
    },
  },
  cancelBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    padding: 0,
    minWidth: 0,
    fontSize: 12,
  },
  enterTab: {
    width: 208,
    height: 52,
    alignItems: 'center',
    justifyCntent: 'space-around',
    borderRadius: 4,
    paddingTop: 10,
    marginLeft: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
    boxShadow: ' 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #2083ff',
  },
  addCircleIcon: {
    color: '#ccc',
  },
}))

export default useStyles
