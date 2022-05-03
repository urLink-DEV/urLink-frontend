import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px 67px 0 20px',
    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  content: {
    minHeight: 'calc(100vh - 61px);',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px);',
  },
}))

export default useStyles
