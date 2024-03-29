import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fafafa',

    '& > .resizable-category .resize-handler': {
      right: '0 !important',
      borderRight: ({ resizing }) => (resizing ? '2px solid #E9E9E9' : 'transparent'),
      '&:hover': {
        borderRight: '2px solid #E9E9E9',
      },
    },
  },
  main: {
    width: '100%',
    height: '100vh',

    overflow: 'scroll',
  },
}))

export default useStyles
