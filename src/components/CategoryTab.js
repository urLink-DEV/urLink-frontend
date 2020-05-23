import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/Input';
import {useCategoryDispatch} from '../containers/CategoryContainer';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 208,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding:12,
    fontFamily: "SpoqaHanSans",
    fontSize: 16,
  },
  selected : {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2083ff'
  }
}))

export default function CategoryTab({text, id, selected}) {
  const classes = useStyles()
  const dispatch = useCategoryDispatch()
  const [value, setValue] = useState(text);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onDoubleClick = () => {
    setDisabled(!disabled)
  }

  const updateText = (e) => {
      if (e.keyCode === 13) {
        dispatch.updateCategory(id, value, false )
        setDisabled(!disabled)
      }
  }


  return (
    <div>
      <Paper 
        component="div" 
        className={classes.root} 
        id={`${id}`}
      >
        <InputBase 
          disableUnderline={true}
          className={classes.input + (selected ? ' selected': '')}
          disabled={disabled}
          onDoubleClick={onDoubleClick}
          value={value}
          onChange={handleChange}
          onKeyDown={updateText}
        />
      </Paper>
    </div>
  )
}