import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    position: 'relative',
    height: 40,
    display: 'block',
    borderRadius: 4,
    margin: '4px auto',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: ({ hovered, selected, editing }) =>
      editing ? 'transparent' : hovered || selected ? '#E8F1FF' : 'transparent',
    '&:hover': {
      backgroundColor: ({ selected }) => (selected ? '#E8F1FF' : '#F2F2F2'),
    },
    border: ({ editing }) => (editing ? `1px solid ${theme.palette.primary.main}` : 'unset'),
  },
  tab: {
    borderRadius: 4,
    width: '100%',
    padding: '0 16px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ({ moreOpen, selected }) =>
      moreOpen && selected ? '#E8F1FF' : moreOpen && !selected ? '#F2F2F2' : 'transparent',
    '& > .show-btn-group': {
      visibility: ({ moreOpen }) => (moreOpen ? 'visible' : 'hidden'),
    },
    '&:hover': {
      '& > .show-btn-group': {
        visibility: 'visible',
      },
      '& > .link-container': {
        visibility: 'hidden',
      },
    },
  },
  dragFinished: {
    opacity: '80%',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    width: 'calc(100% - 60px)',
    fontWeight: ({ selected }) => (selected ? 700 : 400),
    lineHeight: '32px',
    color: ({ selected }) => (selected ? '#333' : '#666'),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  urlCount: {
    display: 'inline-block',
    fontSize: 12,
    lineHeight: '32px',
    color: '#999',
    opacity: 0.6,
    textAlign: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    visibility: ({ moreOpen }) => (moreOpen ? 'hidden' : 'visible'),
  },
  btnGroup: {
    position: 'absolute',
    padding: '8px 16px 8px 0',
    top: 0,
    right: 0,
    display: 'flex',
    borderRadius: 4,

    '& > button': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      backgroundColor: '#fff',
      borderRadius: 4,
      padding: 0,
      border: 'unset',
      marginLeft: 8,
      cursor: 'pointer',
    },
  },
  moreBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 12,
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#fff',
    boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: 8,
    zIndex: 10,
    width: 107,
    height: 77,

    '& > button': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#666',
      backgroundColor: 'transparent',
      border: 'unset',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',

      '&:hover': {
        fontWeight: '900',
      },
    },
  },
}))

export default useStyles
