import { fade, makeStyles } from '@material-ui/core/styles'
 
export const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  mainFont: {
    backgroundColor: 'transparent',
    height: '36px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '20pt',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000'
  },
}))

export default useStyles