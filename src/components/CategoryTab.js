import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

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

export default function CategoryTab({text}) {
  const classes = useStyles()

  return (
    <div>
      <Paper component="div" className={classes.root}>
        <Input
          disableUnderline={true}
          className={classes.input}
          defaultValue={text}
        />
      </Paper>
    </div>
  )
}