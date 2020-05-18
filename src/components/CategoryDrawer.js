import React, {useState, useEffect, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import {AlertModal} from '../components/modal';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CategoryTab from '../components/CategoryTab';
import '../pages/Category.scss';
import {useCategoryState, useCategoryDispatch} from '../containers/CategoryContainer';

const drawerWidth = 260;

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
  listItem: {
    width: 208,
    borderRadius: 4,
    padding: 0,
    marginTop: 10,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    '&:hover': {
      boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12)"
    }  
  },
  addButton: {
    width: 208,
    height: 52,
    display: 'block',
    borderRadius: 4,
    margin: "10px 0",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  deleteButton: {
    display: 'none',
    width: 208,
    height: 52,
    borderRadius: 4,
    margin: "10px 0",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f1f3f5",
    '&:hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  enterTab: {
    width: 208,
    height: 52,
    display: 'none',
    alignItems: 'center',
    justifyCntent: "space-around",
    borderRadius: 4,
    padding: 8,
    marginTop: 10,
    backgroundColor: "#ffffff",
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff",
  },
  flex: {
    display: 'flex'
  },
  block: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  },
  input: {
    padding:12,
    width: 122,
    height: 28,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#f1f3f5",
    fontFamily: "AppleSDGothicNeo",
    fontSize: 14,
  },
  okBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#2083ff",
    padding: 0,
    minWidth: 0,
    color: "#fff",
    fontFamily: "SpoqaHanSans",
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#2083ff'
    }
  },
  cancleBtn: {
    width: 37,
    height: 24,
    borderRadius: 4,
    padding: 0,
    minWidth: 0,
    fontFamily: "SpoqaHanSans",
    fontSize: 12
  },
  selected: {
    width:210,
    boxShadow:" 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 5px 12px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #2083ff",
  }
}));

export default function CategoryDrawer(props) {


  const dispatch = useCategoryDispatch()
  /*
  dispatch.getCategory()
  dispatch.writeCategory(value,1,false)
  이런식으로 함수 4가지 중에 하나 불러와서 사용 가능
  */

  const { 
    defaultCategories,
    favoriteCategories,
  } = props;
  

  console.log(defaultCategories, favoriteCategories)
  
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [addOpen, setAddOpen] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enterOpen, setEnterOpen] = useState(false)


  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const addTab = () => {
    dispatch.writeCategory(value,1,false)
    setValue('')
    setAddOpen(true)
    setEnterOpen(false)
  }
  
  const cancleAddTab = () => {
    setAddOpen(true)
    setEnterOpen(false)
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setDeleteOpen(false)
    setAddOpen(true)
  }
  
  const deleteTab = () => {
    dispatch.deleteCategory(selectedId)
    setDeleteModalOpen(false)
    setDeleteOpen(false)
    setAddOpen(true)
  }
  const toggleAddBtn = (id) => {
    setAddOpen(false)
    setDeleteOpen(true)
    setSelectedId(id);
    console.log(document.activeElement)
  }

  const toggleEnterTab = () => {
    setAddOpen(false)
    setEnterOpen(true)
  }


  useEffect(() => {
    dispatch.getCategory()
  },[])


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
          {favoriteCategories.map((data, index) => (
            <ListItem 
            key={data.id} 
            className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
            onClick={() => toggleAddBtn(data.id)}>
              <CategoryTab key={data.id} text={data.name} id={data.id} />
            </ListItem>
          ))}
        </List>
        <div className="category-text">
          Category
        </div>
        <hr />
        <Button 
          className={classes.addButton + (addOpen ? '' : ' '+classes.hidden)} 
          variant="contained"
          onClick={toggleEnterTab}
        >
          <AddCircleOutlineIcon style={{color: "#cccccc"}} />
        </Button>
        <Button 
          className={classes.deleteButton + (deleteOpen ? ' '+classes.block : '')} 
          variant="contained" 
          onClick={openDeleteModal}
        >
          <DeleteIcon style={{color: "#cccccc"}} />
        </Button>
        <Paper 
          component="div" 
          className={classes.enterTab + (enterOpen ? ' '+classes.flex : '')}
        >
          <Input
            disableUnderline={true}
            className={classes.input}
            placeholder="New one"
            value={value}
            onChange={handleChange}
          />
            <Button className={classes.okBtn} onClick={addTab}>확인</Button>
            <Button className={classes.cancleBtn} onClick={cancleAddTab}>취소</Button>
        </Paper>
        <List>
        {defaultCategories.map((data, index) => (
          <ListItem 
          key={data.id} 
          className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
          onClick={() => toggleAddBtn(data.id)}>
            <CategoryTab key={data.id} text={data.name} id={data.id} />
          </ListItem>
        ))}
        </List>
      </div>

      <AlertModal 
        btnText = '삭제'
        modalText = '카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?'
        openBool = {deleteModalOpen} 
        onClose = {closeDeleteModal}
        onClickOk = {deleteTab} />
    </div>
  )

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