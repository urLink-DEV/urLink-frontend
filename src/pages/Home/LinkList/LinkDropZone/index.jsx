import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import { AddToPhotos as AddToPhotosIcon } from '@material-ui/icons';
import useStyles from './style';
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui';
import { linkCreateThunk } from '@modules/link'
import { selectSelectedCategory } from '@modules/category'

const { LINK } = DRAG;
const { LINK_DROP_ZONE } = DROP_ZONE;

function LinkDropZone({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selectedCategory = useSelector(selectSelectedCategory)
  const { listData } = useDrag(LINK);
  const { open } = useDropZone(LINK_DROP_ZONE);

  const dropOnCardArea = async (e) => {
    e.stopPropagation()
    listData.forEach(async link => await dispatch(linkCreateThunk({
      categoryId: selectedCategory.id,
      path: link.path
    })))
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
