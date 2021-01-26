import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: '#ffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px rgba(32, 131, 255, 0)',
    borderRadius: 4,
    margin: '13px 0',
    padding: 1,
    '& .Mui-focusVisible': {
      backgroundColor: 'transparent',
    },
    '&:hover,  &:focus-within': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
      '& > $buttonGroup': {
        visibility: 'inherit',
      },
    },
  },
  selected: {
    border: 'solid 1px rgba(32, 131, 255, 1)',
  },
  listButton: {
    padding: '3px 12px 3px 12px',
    '& .MuiListItemIcon-root': {
      minWidth: 16,
      marginRight: 12,
    },
    '& .MuiListItemText-primary': {
      display: 'flex',
    },
  },
  favicon: {
    width: 16,
    height: 16,
  },
  mainFont: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    marginRight: 12,
    width: 295,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
    letterSpacing: -0.44,
    color: '#212529',
  },
  subFont: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    width: 157,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
    letterSpacing: -0.6,
    color: '#737b84',
  },
  buttonGroup: {
    visibility: 'hidden',
  },
  iconButton: {
    padding: 5,
  },
}));

export default useStyles