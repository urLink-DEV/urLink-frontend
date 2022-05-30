import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    height: 40,
    display: 'block',
    borderRadius: 4,
    margin: '4px auto',
    outline: 'none',
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
  favoriteStar: {
    marginLeft: '2px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
}))

export default useStyles
