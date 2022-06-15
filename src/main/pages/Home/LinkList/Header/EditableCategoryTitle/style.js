import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    maxWidth: 499,
    borderRadius: 8,
  },
  titleContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: '#333',
  },
  updateBtn: {
    marginLeft: 10,
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
