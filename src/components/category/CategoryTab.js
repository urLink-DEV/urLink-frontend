import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
// import {useCategoryDispatch} from '../../containers/CategoryContainer';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 208,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding:12,
    fontFamily: "SpoqaHanSans",
    fontSize: 16,
  }
}))

export default function CategoryTab({text, id}) {
  const classes = useStyles()
  // const dispatch = useCategoryDispatch()
  const [value, setValue] = useState(text);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onDoubleClick = () => {
    setDisabled(!disabled)
  }

  // const updateText = (e) => {
  //   console.log(id)
  //     if (e.keyCode === 13) {
  //       dispatch.updateCategory(id, value, false )
  //       setDisabled(!disabled)

  //     }
  // }


  return (
    <div>
      <Paper 
        component="div" 
        className={classes.root} 
      >
        <Input
          disableUnderline={true}
          className={classes.input}
          disabled={disabled}
          onDoubleClick={onDoubleClick}
          value={value}
          onChange={handleChange}
          // onKeyDown={updateText}
        />
      </Paper>
    </div>
  )
}