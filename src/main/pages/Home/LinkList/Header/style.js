import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,

    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      height: 40,
    },
  },
  selectLinksBtn: {
    padding: '8px 20px',
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

export default useStyles
