import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    padding: '5px 67px 0 20px',
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  content: {
    maxHeight: 'calc(100vh - 61px);',
    overflow: 'scroll',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
