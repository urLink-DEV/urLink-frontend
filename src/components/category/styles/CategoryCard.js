import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  divRoot: {
    display: 'inline',
  },
  root: {
    maxWidth: 345,
    margin: 5,
  },
  cardContent: {
    height: 80,
    padding: 5,
  },
  cardContentTitle: {
    fontSize: 14,
  },
  cardContentDesc: {
    fontSize: 12,
  },
  cardActions: {
    padding: 5
  },
  icons: {
    padding: 5
  },
  '@global': {
    'div.MuiDialogContent-root:first-child': {
      padding: 0
    },
    'div.MuiDialog-paperWidthSm': {
      width: 310,
      height: 460,
    },
    // 'input.MuiInputBase-input': {
    //   display: 'none'
    // },
    '.MuiCardActions-spacing > :not(:first-child)': {
      marginLeft: 0,
    },
    'div.MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
  }
});

export default useStyles