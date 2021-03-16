import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    flexShrink: 0,
    height: 36,
  },
  editIconActive: {
    color: green[600],
  },
}))

export default useStyles
