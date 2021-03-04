import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    paddingLeft: 34,
    paddingRight: 34,
    height: '100vh'
  },
  content: {
    maxHeight: 'calc(100vh - 58px);',
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
