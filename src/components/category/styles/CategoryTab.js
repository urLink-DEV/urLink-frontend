import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 208,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding:12,
    fontFamily: "SpoqaHanSans",
    fontSize: 16,
    width: "70%"
  },
  selected : {
    fontSize: 16,
    fontWeight: "bold",
    color: '#2083ff'
  },
  urlCountBox : {
    width: "30%",
    display: "inline-block",
    fontSize: 12,
    fontFamily: "SpoqaHanSans",
    color: "#868e96",
    textAlign: "center"
  }

}))

export default useStyles