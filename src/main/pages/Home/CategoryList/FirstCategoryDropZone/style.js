import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  categoryDropZone: {
    width: '100%',
    height: '300px',
  },
  title: {
    borderRadius: '4px',
    border: 'dashed 1px #CCCCCC',
    backgroundColor: '#FCFCFC',
    fontSize: 14,
    fontWeight: 400,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '38px',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#CCCCCC',
    margin: '10px auto',
  },
}))

export default useStyles
