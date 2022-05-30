import { ListItem } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,

    [theme.breakpoints.up('sm')]: {
      height: 40,
    },
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.64,
    textAlign: 'center',
  },
  tabOpenText: {
    color: theme.palette.primary.main,
  },
  tabDeleteText: {
    color: theme.palette.secondary.main,
  },
  selectLinksBtn: {
    padding: '8px 20px',
    marginLeft: 'auto',
    color: '#666666',
    backgroundColor: '#ffffff',
    border: '1px solid #E6E6E6',
    borderRadius: 8,
  },
  selectLinksBtnGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    marginLeft: 'auto',
  },
  chosenLinks: {
    marginRight: 8,
  },
  btnInBtnGroup: {
    padding: '8px 20px',
    marginLeft: 8,
    backgroundColor: '#EDF0FF',
    borderRadius: 8,
  },
  deleteLinksBtn: {
    color: 'red',
    padding: '8px 20px',
    marginLeft: 8,
    backgroundColor: '#FFEDE9',
    borderRadius: 8,
  },
  refreshBtn: {
    padding: 6,
  },
}))

export const StyledListItem = withStyles((theme) => ({
  root: {
    width: 48,
    height: 48,

    backgroundColor: 'white',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: '#d6e4f5',
      '& img': {
        filter: 'brightness(10)',
      },
    },
  },
}))(ListItem)

export default useStyles
