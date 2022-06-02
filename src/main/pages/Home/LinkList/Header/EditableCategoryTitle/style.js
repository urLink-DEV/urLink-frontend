import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((_theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    padding: '12px 12px 12px 24px',
    maxWidth: 499,
    width: '100%',
    borderRadius: 8,
    border: ({ isEditable }) => (isEditable ? '1px solid #1D78FF' : 'unset'),
  },
  titleContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: '#333',
  },
  confirmBtn: {
    width: 74,
    height: 38,
    backgroundColor: '#1D78FF',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 400,
    fontSize: 14,
    border: 'unset',
    cursor: 'pointer',
  },
  iconBtn: {
    color: '#AAAAAA',
    width: 18,
    height: 18,
    padding: 4,
    marginRight: 10,
  },
}))

export default useStyles
