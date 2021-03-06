import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

export const useStyles = makeStyles((_theme) => ({
  root: {
    height: 36,
  },
  editIconActive: {
    color: green[600],
  },
}))

export default useStyles
