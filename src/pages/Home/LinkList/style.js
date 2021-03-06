import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 5,
    paddingLeft: 28,
    paddingRight: 20,
    height: '100vh',
        backgroundColor:
      theme.palette.type !== 'dark'
        ? theme.palette.colorGroup.lightGrey
        : theme.palette.background.default,
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
