import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 260

export const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: drawerWidth,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
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
    margin: '10px 0',
    display: 'block'
  },
  hiddenDropZone: {
    width: '212px',
    height: '100vh',
    display: 'block',
    opacity: 0
  },
  dragline: {
    width: 208,
    height: 2,
    borderRadius: 2,
    backgroundImage: "linear-gradient(271deg, #e0f6ff, #2083ff)",
    opacity: 0
  },
  layout: {
    width: 240,
    marginTop: 72,
    backgroundColor: '#fff',
  },
  hr: {
    width: '70%',
    border: '1px solid #d6d6d6',
  },
  favoriteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
  favoriteText: {
    height: 18,
    fontFamily: 'SpoqaHanSans',
    fontSize: 12,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#2083ff',
    display: 'inline-block',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 5,
  },
  categoryText: {
    height: '18px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#868e96',
    display: 'inline-block',
  },
  addButton: {
    width: 208,
    height: 52,
    borderRadius: 4,
    marginLeft: 15,
    marginTop: 10,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  deleteButton: {
    display: 'none',
    width: 208,
    height: 52,
    borderRadius: 4,
    marginLeft: 15,
    marginTop: 10,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  block: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  },
  input: {
    padding: '0 12px',
    width: 122,
    height: 28,
    borderRadius: 4,
    marginRight: 4,
    marginLeft: 4,
    backgroundColor: "#f1f3f5",
    fontFamily: "AppleSDGothicNeo",
    fontSize: 14,
  },
  okBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#2083ff",
    padding: 0,
    minWidth: 0,
    color: "#fff",
    fontFamily: "SpoqaHanSans",
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#2083ff'
    }
  },
  cancelBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    padding: 0,
    minWidth: 0,
    fontFamily: "SpoqaHanSans",
    fontSize: 12
  },
  enterTab: {
    width: 208,
    height: 52,
    alignItems: 'center',
    justifyCntent: "space-around",
    borderRadius: 4,
    paddingTop: 10,
    marginLeft: 15,
    marginTop: 10,
    backgroundColor: "#ffffff",
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff",
  },
  listItem: {
    marginLeft: 15,
  },
  flexCoverBackground: {
    display: 'flex',
    opacity: 1,
  },
  coverBackground: {
    position: 'absolute',
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
    height: 50
  }, 
  '@global': {
    '.MuiListItem-root': {
      width: 208
    },
    '.MuiListItem-gutters' : {
      padding: 0,
    }
  }
}))