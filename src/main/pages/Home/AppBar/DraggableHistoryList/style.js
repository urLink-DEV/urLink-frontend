import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    width: 656,
    height: 'calc(100vh - 72px);',

    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: '17px 36px',
  },
  mainText: {
    marginRight: 10,
    marginTop: 2,
    height: 36,

    backgroundColor: 'transparent',

    fontWeight: 700,
    fontSize: 20,
    color: '#333333',
  },
  reloadIcon: {
    width: 16,
    height: 16,
    padding: 0,
    color: '#666666',
  },
  headerButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerSelectedLinkText: {
    color: '#747778',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: '30px',
  },
  headerButton: {
    padding: '12px 24px',

    backgroundColor: '#EDF0FF',
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#0058CB',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: '14px',
  },
  content: {
    overflowY: 'scroll',
    overflowX: 'hidden',

    height: '100%',
    paddingTop: 0,
  },
  imgContent: {
    width: 'auto',
  },

  /* common */
  rowSpread: {
    display: 'flex',
    alignItems: 'center',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop16: {
    marginTop: 16,
  },
}))

export default useStyles
