import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { CategoryTab } from '../components/category'
import '../pages/Category.scss'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function CategoryDrawer(props) {
  const { window, categories, favoriteCategories } = props;
  console.log(window, categories, favoriteCategories)
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className="list-tab-layout">
        <div className="favorite-text">
          Favorite
        </div>
        <hr />
        <div className="drag-box">
          Drag the category here!
        </div>
        <List>
          {favoriteCategories.map((text, index) => (
            <ListItem button key={text}>
              <CategoryTab key={index} text={text}>
                <ListItemText primary={text} />
              </CategoryTab>
            </ListItem>
          ))}
        </List>
        <div className="category-text">
          Category
        </div>
        <hr />
      </div>
      <List>
        {categories.map((text, index) => (
          <CategoryTab key={index} text={text}>
            <ListItemText primary={text} />
          </CategoryTab>
        ))}
      </List>   
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      {props.appBar}
    </div>
  );
}