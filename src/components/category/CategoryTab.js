import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import useStyles from './styles/CategoryTab'
// import {useCategoryDispatch} from '../../containers/CategoryContainer';


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