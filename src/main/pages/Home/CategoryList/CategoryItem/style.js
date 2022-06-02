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
  title: {
    fontSize: 14,
    width: 120,
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
  dragFinished: {
    position: 'relative',
    fontWeight: 'bold',
    '& > :first-child': {
      color: '#fff !important',
      zIndex: 1,
    },
    '& > div > span': {
      color: '#fff !important',
      zIndex: 1,
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 0,
      opacity: 1,
      backgroundImage: 'linear-gradient(271deg, #e0f6ff, #2083ff)',
      borderRadius: '4px',
      animationFillMode: 'none',
      animation: `$dragFinished 0.7s ease-in-out forwards 1`,
      '&::transform-origin': '100% 0%',
      '&::animation': `$dragFinished 0.7s ease-in-out forwards 1`,
    },
  },
  '@keyframes dragFinished': {
    '0%': {
      width: 0,
    },
    '70%': {
      width: '100%',
      opacity: 1,
    },
    '90%': {
      opacity: 0,
      width: '100%',
    },
    '100%': {
      opacity: 0,
      width: 0,
    },
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
