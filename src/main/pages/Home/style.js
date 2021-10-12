import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  categoryList: {
    flexShrink: 0,
    width: 260,
  },
  main: {
    width: '100%',
    padding: '5px 67px 0 20px',
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  appBar: {
    position: 'fixed',
    right: 0,
    width: 52,
  },
}))

export default useStyles
