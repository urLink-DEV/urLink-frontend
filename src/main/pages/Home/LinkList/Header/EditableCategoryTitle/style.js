import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    maxWidth: 499,
    borderRadius: 8,
  },
  title: {
    fontWeight: 700,
    fontSize: 28,
    color: '#333',
  },
  titleInversion: {
    fontSize: 16,
  },
  updateBtn: {
    marginLeft: 10,
  },
  updateBtnInversion: {
    opacity: 0,
  },
  confirmBtn: {
    width: 74,
    height: 38,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 400,
    fontSize: 14,
    border: 'unset',
    cursor: 'pointer',
  },
}))

export default useStyles
