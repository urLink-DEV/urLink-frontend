import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'SpoqaHanSans'
  },
  title: {
    marginRight: '10px',
    width: '50px'
  },
  line: {
    display: 'inline-block',
    width: '445px',
    height: '1px',
    backgroundColor: '#ced4da'
  }
}))

export default useStyles