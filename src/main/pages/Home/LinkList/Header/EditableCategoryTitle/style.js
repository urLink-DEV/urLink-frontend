import green from '@mui/material/colors/green'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  categoryName: {
    fontWeight: 700,
    fontSize: 28,
    marginRight: 16,
  },
  editIconActive: {
    color: green[600],
  },
  iconBtn: {
    color: '#AAAAAA',
    width: 18,
    height: 18,
    padding: 4,
    marginRight: 10,
  },
}))

export default useStyles
