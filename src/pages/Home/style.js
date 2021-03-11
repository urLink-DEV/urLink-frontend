import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',
  },
  main: {
    width: '100%',
  },
}))

export default useStyles
