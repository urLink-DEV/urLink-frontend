import { makeStyles, withStyles } from '@material-ui/core/styles';
import {  ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    width: 50,
    height: '100vh',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  toolBar: {
    paddingTop: 32,
  },
  imgButton: {
    width: 20,
    height: 20,
    '& > img': {
      objectFit: 'contain',
    },
  },
}));

export const StyledListItem = withStyles((theme) => ({
  root: {
    margin: '17px auto',
    borderRadius: 4,
    height: 40,
    '&:hover': {
      backgroundColor: '#d6e4f5',
      '& img': {
        filter: 'brightness(10)',
      },
    },
  },
}))(ListItem);

export default useStyles;
