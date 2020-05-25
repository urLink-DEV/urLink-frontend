import React, {useState} from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import CategoryHistoryContainer from '../../containers/category/CategoryHistoryContainer'
import CategoryTab from './CategoryTab'
import useStyles from './styles/CategoryDrawer'
import CategorySearchPopOver from './CategorySearchPopOver'

export default function CategoryDrawer(props) {

  /*
  dispatch.getCategory()
  dispatch.writeCategory(value,1,false)
  이런식으로 함수 4가지 중에 하나 불러와서 사용 가능
  */

  const { 
    defaultCategories,
    favoriteCategories,
    selectedCategoryTitle,
    children,
  } = props

  const classes = useStyles()
  const [value, setValue] = useState('')
  const [selectedId, setSelectedId] = useState('')


  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const handleId = (id) => {
    setSelectedId(id);
  }
  
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
            <ListItem key={index} 
              className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
              onClick={() => handleId(data.id)}>
              <CategoryTab key={index} text={data.name} id={data.id}/>
            </ListItem>
          ))}
        </List>
        <div className="category-text">
          Category
        </div>
        <hr />
        <Button className={classes.tabButton} variant="contained">
          <AddCircleOutlineIcon style={{color: "#cccccc"}} />
        </Button>
        <Button className={classes.tabButton} variant="contained">
          <DeleteIcon style={{color: "#cccccc"}} />
        </Button>
        <Paper component="div" className={classes.enterTab}>
          <Input
            disableUnderline={true}
            className={classes.input}
            placeholder="New one"
            value={value}
            onChange={handleChange}
          />
            <Button className={classes.okBtn}>확인</Button>
            <Button className={classes.cancleBtn}>취소</Button>
        </Paper>
        <List>
        {defaultCategories.map((data, index) => (
          <ListItem key={index} 
            className={classes.listItem + (data.id === selectedId ? ' '+classes.selected : '' )}
            onClick={() => handleId(data.id)}>
            <CategoryTab key={index} text={data.name} id={data.id} />
          </ListItem>
        ))}
        </List>   
      </div>
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
        <div className={classes.toolbar}>
          {selectedCategoryTitle}
          <CategorySearchPopOver onClickBtn={}/>
        </div>
        {children}
      </main>
      <CategoryHistoryContainer />
    </div>
  );
}