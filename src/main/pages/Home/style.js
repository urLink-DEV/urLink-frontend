import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  categoryList: {
    flexShrink: 0,
    minWidth: 288,
    backgroundColor: '#fff',
  },
  main: {
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    right: 0,
    width: 52,
  },
}))

export default useStyles
