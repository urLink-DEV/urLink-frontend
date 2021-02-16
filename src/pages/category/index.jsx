import React from 'react';
import { useStyles } from './style';

import CategoryAppBar from '@pages/category/AppBar';
import CategoryList from '@pages/category/CategoryList';
import Main from '@pages/category/Main';

export default function CategoryDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CategoryList />
      <Main />
      <CategoryAppBar />
    </div>
  );
}
