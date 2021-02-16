import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

export const useStyles = makeStyles((theme) => ({
  logo: {
    width: 95,
    margin: '28px 5px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  firstFavoriteDropZone: {
    width: '212px',
    height: '52px',
    borderRadius: '4px',
    border: 'dashed 1px #ced4da',
    backgroundColor: '#f8f9fa',
    fontSize: '15px',
    fontWeight: 300,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '50px',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#868e96',
    margin: '10px 15px',
  },
  hiddenFavoriteDropZone: {
    width: '212px',
    height: '50px',
  },
  hiddenCategoryDropZone: {
    width: '212px',
    height: '100vh',
  },
  dragline: {
    width: 208,
    marginLeft: 15,
    height: 2,
    borderRadius: 2,
    backgroundImage: 'linear-gradient(271deg, #e0f6ff, #2083ff)',
    opacity: 0,
  },
  layout: {
    width: 240,
    margin: 'auto',
    padding: '0 10px',
    backgroundColor: '#fff',
  },
  block: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },

  flexCoverBackground: {
    display: 'flex !important',
    opacity: '1 !important',
  },
  coverBackground: {
    position: 'absolute',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(53, 142, 255, 0.15)',
    height: '100%',
    width: 'calc(100% - 600px)',
    paddingLeft: 259,
    zIndex: 1,
    opacity: 0,
  },
  addLinkIcon: {
    color: '#358eff',
    width: 50,
    height: 50,
  },
}));
