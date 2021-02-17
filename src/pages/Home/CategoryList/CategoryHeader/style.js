import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
}));
