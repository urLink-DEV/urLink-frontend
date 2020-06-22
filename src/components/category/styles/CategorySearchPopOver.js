import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  searchBtn: {
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
    },
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
    padding: '5px 10px',
    margin: '0 16px'
  },
  searchBtnText: {
    width: '34px',
    height: '15px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '12pt',
    fontWeight: '300',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#868e96',
  },
  searchIcon: {
    marginRight: 5
  },
  '@global': {
    '.MuiFilledInput-inputMarginDense': {
      paddingTop: '10px'
    }
  }
}))
export default useStyles