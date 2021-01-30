import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

export const StyledFab = withStyles((theme) => ({
  root: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: 0,
    bottom: 7,
    right: 5,
    position: 'absolute',
  },
}))(Fab);
