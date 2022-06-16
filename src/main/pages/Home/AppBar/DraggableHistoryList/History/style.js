import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: '10px 0',
    padding: '2px 253px 2px 16px',

    width: 583,
    height: 36,

    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,

    '& .Mui-focusVisible': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: '#F2F2F2',
      '& > $buttonGroup': {
        visibility: 'inherit',
      },
    },
  },
  selected: {
    backgroundColor: '#E8F1FF',
  },
  listButton: {
    padding: '1px 0 0 0',
    width: 555,

    '& .MuiListItemIcon-root': {
      minWidth: 14,
      marginRight: 17,
    },
    '& .MuiListItemText-primary': {
      display: 'flex',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  favicon: {
    width: 14,
    height: 14,
  },
  mainFont: {
    display: 'inline-block',
    verticalAlign: 'bottom',

    overflow: 'hidden',

    width: 266,
    marginRight: 16,

    color: theme.palette.text.secondary,

    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.44,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  subFont: {
    display: 'inline-block',
    verticalAlign: 'bottom',

    overflow: 'hidden',

    width: 157,

    color: theme.palette.text.description,

    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.6,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  buttonGroup: {
    visibility: 'hidden',

    display: 'flex',
    gap: 7,
  },
  iconButton: {
    padding: 7,

    width: 25,
    height: 25,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    color: '#666666',
  },
  openInNewIcon: {
    width: 11.11,
  },
  linkIcon: {
    width: 16.67,
  },
}))

export default useStyles
