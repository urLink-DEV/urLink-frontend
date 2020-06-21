import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  '@global': {
    '.MuiListItemText-primary': {
      fontSize: 14,
    },
    '.MuiListItemText-secondary': {
      fontSize: 12,
    }
  }
}));

export default useStyles