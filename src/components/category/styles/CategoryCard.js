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
    position: 'relative',
    width: 200,
  },
  selectedRoot: {
    position: 'relative',
    width: 200,
    border: '1px solid #2083ff'
  },
  editableRoot: {
    position: 'relative',
    width: 200,
    border: '1px solid #3cb043'
  },
  cardOpenBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 0,
  },
  cardContent: {
    height: 80,
    padding: 5,
  },
  cardContentTitle: {
    height: 20,
    fontSize: 14,
  },
  cardContentDesc: {
    height: 45,
    fontSize: 12,
  },
  edittingCardContentTitle: {
    height: 20,
    fontSize: 14,
  },
  edittingCardContentDesc: {
    maxHeight: 45,
    fontSize: 12,
  },
  cardActions: {
    padding: 5
  },
  settingsIcon: {
    marginLeft: 'auto'
  },
  copyIcon: {
    width: 18,
    height: 18
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
    'div.MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
    'textarea.MuiInputBase-input.MuiInputBase-inputMultiline': {
      maxHeight: 45
    }
  }
});

export default useStyles