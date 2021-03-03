import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    padding: theme.spacing(3),
    margin: '0 50px 0 0',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
