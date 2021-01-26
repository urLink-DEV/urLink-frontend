import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    position: 'absolute',
    marginRight: 10,
    width: 80,
    backgroundColor: '#f6f6f6'
  },
  line: { 
    display: 'inline-block',
    width: '100%',
    height: 1,
    backgroundColor: '#ced4da'
  }
}))

export default useStyles