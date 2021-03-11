import React, { forwardRef } from 'react';
import clsx from 'clsx';
import useStyles from './style';
import moveLink from '@images/move.png';

const HistoryDragBox = forwardRef(({ selectedCount }, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} className={clsx(classes.tabMove)}>
      <div className={classes.circle}>
        <img className={classes.moveIcon} src={moveLink} alt="move links" />
      </div>
      <span>링크 {selectedCount}개 이동</span>
    </div>
  );
});

export default HistoryDragBox;
