import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 547,
  },
  title: {
    minWidth: 42,
    maxWidth: 80,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '36px',

    position: 'absolute',

    paddingRight: 8,

    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  line: {
    width: 575,
    height: 0.5,

    display: 'inline-block',
    background: '#C3C3C3',
  },
}))

export default useStyles
