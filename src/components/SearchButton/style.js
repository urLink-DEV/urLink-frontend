import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchBtn: {
    borderRadius: 4,
    height: 30,
    padding: '5px 10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
    },
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBtnText: {
    width: 34,
    height: 15,
    fontSize: '12pt',
    fontWeight: '300',
    textAlign: 'center',
    color: '#868e96',
  },
  inputBox: {
    borderRadius: 4,
    width: 220,
    padding: '5px 10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
  },
  textfield: {
    '&:focus': { border: '1px solid #2083ff' },
    padding: '3px 7px',
    outline: 'none',
    borderRadius: '4px',
    border: 'solid 1px #e9ecef',
    backgroundColor: '#f1f3f5',
    width: '100%',
    height: '28px',
  },
  marginBottom10: {
    marginBottom: 10,
  },
}));

export default useStyles;
