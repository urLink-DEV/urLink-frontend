import { makeStyles } from '@material-ui/core/styles'
import {withStyles} from '@material-ui/styles'
import { KeyboardDateTimePicker } from '@material-ui/pickers'

export const DatePickerWithStyles = withStyles((theme) => ({
  '@global': {
    'input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd': {
      display: 'none',
    },
    'div.MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
      marginLeft: 0,
    },
    'button.MuiButtonBase-root.MuiIconButton-root': {
      padding: 3,
    }
  },
}))(KeyboardDateTimePicker);

const useStyles = makeStyles({
  divRoot: {
    display: 'inline',
  },
  root: {
    width: 200,
    margin: 10,
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
  '@global': {
    'div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-2': {
      maxWidth: '100%',
    },
    'div.MuiPaper-root.MuiDialog-paper.MuiPickersModal-dialogRoot.MuiPickersModal-dialogRootWider.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded': {
      width: 323.565,
      height: 505.611,
      minWidth: 310,
      maxWidth: 600,
    },
    'div.MuiDialogContent-root.MuiPickersModal-dialog': {
      padding: 0
    },
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