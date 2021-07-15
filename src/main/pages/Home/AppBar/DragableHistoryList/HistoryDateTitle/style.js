import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    position: 'absolute',

    width: 80,
    marginRight: 10,

    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  line: {
    display: 'inline-block',

    width: '100%',
    height: 1,

    backgroundColor: '#ced4da',
  },
}))

export default useStyles
