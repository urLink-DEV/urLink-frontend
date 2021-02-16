import React from 'react';
import { useStyles } from './style';

import CategoryAppBar from '@pages/Home/AppBar';
import CategoryList from '@pages/Home/CategoryList';
import LinkList from '@pages/Home/LinkList';

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CategoryList />
      <LinkList />
      <CategoryAppBar />
    </div>
  );
}
