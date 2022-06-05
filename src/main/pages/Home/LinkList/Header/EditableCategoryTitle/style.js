import green from '@mui/material/colors/green'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    flexShrink: 0,
  },
  editIconActive: {
    color: green[600],
  },
  iconBtn: {
    padding: 4,
  },
}))

export default useStyles
