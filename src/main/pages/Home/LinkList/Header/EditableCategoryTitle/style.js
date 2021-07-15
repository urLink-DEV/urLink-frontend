import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    flexShrink: 0,
  },
  editIconActive: {
    color: green[600],
  },
}))

export default useStyles
