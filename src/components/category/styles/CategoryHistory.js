import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
  },
  urlTitleFont: {
    width: '50px',
    height: '18px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#868e96'
  },
  linkDiv: {
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)',
      "& $linkDivSubFont": {
        width: "127px"
      },
      "& $linkIcon" : {
        display: "inline"
      }
    },
    width: '527px',
    fontFamily: 'SpoqaHanSans',
    borderRadius: '4px',    
    padding: '5px 12px 5px 12px',
    margin: '10px 0',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
  },
  linkFavicon: {
    width: '16px',
    height: '16px',
    fontFamily: 'simple-line-icons',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#212529',
    marginRight: '12px'
  },
  linkDivMainFont: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden', 
    textOverflow: 'ellipsis',

    width: '295px',
    height: '17px',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.44px',
    color: '#212529',
    marginRight: '12px'
  },
  linkDivSubFont: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden', 
    textOverflow: 'ellipsis',

    width: '157px',
    height: '19px',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.6px',
    color: '#737b84'
  },
  linkIcon: {
    display: "none",
    '&:hover': {
      cursor: 'pointer'
    }
  },
  selectedDiv: {
    border: 'solid 1px #2083ff'
  },
  copyTextArea: {
    display: 'none'
  }
}))

export default useStyles