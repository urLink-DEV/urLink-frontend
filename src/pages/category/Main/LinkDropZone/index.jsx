import React from 'react';
import clsx from 'clsx';
import { AddToPhotos as AddToPhotosIcon } from '@material-ui/icons';
import useStyles from './style';
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui';
const { LINK } = DRAG;
const { LINK_DROP_ZONE } = DROP_ZONE;

function LinkDropZone({ id }) {
  const classes = useStyles();
  const { listData } = useDrag(LINK);
  const { open } = useDropZone(LINK_DROP_ZONE);

  const dropOnCardArea = (e) => {
    e.stopPropagation();
    console.log('id', id);
    console.log('listData', listData);
  };

  const dragOverOnCardArea = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={clsx(classes.coverBackground, {
        [classes.diplayNone]: !open,
      })}
      onDrop={dropOnCardArea}
      onDragOver={dragOverOnCardArea}
    >
      <AddToPhotosIcon className={classes.addLinkIcon} />
    </div>
  );
}

export default LinkDropZone;
