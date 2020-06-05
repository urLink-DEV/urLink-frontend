import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#f6f6f6',
    padding: '5%',
    marginRight: '3%',
  },
  urlDiv: {
    width: '100%',
    height: '32px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
    margin: '10px 0'
  },
  urlText: {
    width: '100%',
    lineHeight: '32px',
    padding: "0 10px"
  }
}))

export default useStyles