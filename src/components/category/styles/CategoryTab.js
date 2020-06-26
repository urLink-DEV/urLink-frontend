import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 208,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listItem: {
    display: 'block',
    width: 208,
    borderRadius: 4,
    padding: '0 !important',
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    '&:hover': {
      boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)"
    },
    outline: 'none'
  },
  input: {
    padding:12,
    fontFamily: "SpoqaHanSans",
    fontSize: 16,
    maxWidth: "60%"
  },
  selected : {
    fontSize: 16,
    color: '#2083ff',
    width:210,
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff",
    borderRadius: '4px'
  },
  modifying : {
    width:210,
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: 'solid 1px #3cb043',
    borderRadius: '4px'
  },
  urlCountBox : {
    display: "inline-block",
    fontSize: 12,
    fontFamily: "SpoqaHanSans",
    color: "#868e96",
    textAlign: "center"
  },
  favoriteStar: {
    marginRight: '8px'
  },
  block: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  },
  marginRight: {
    marginRight: '8px'
  },
  linkBox: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '40%'
  }
}))

export default useStyles