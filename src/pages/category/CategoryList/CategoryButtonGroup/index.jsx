import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { AlertModal } from '@components/modals';
import useEventListener from '@hooks/useEventListener';
import { useStyles } from './style';
import { useToast } from '@modules/ui';

import useDialog from '@modules/ui/hooks/useDialog';
import {
  categorySelect,
  selectSelectedCategory,
  categoriesRead,
  categoriesReadThunk,
  categoryCreateThunk,
  categoryRemoveThunk,
} from '@modules/category';

export default function CategoryButtonGroup() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const selectedCategory = useSelector(selectSelectedCategory);

  const [addOpen, setAddOpen] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [enterOpen, setEnterOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  const {
    open: deleteCategoryOpen,
    toggle: deleteCategoryToggle,
    close: deleteCategoryClose,
  } = useDialog('delete category dialog');

  const handleClickChangeToAddBtn = useCallback(() => {
    setAddOpen(true);
    setDeleteOpen(false);
    setEnterOpen(false);
    return;
  }, [setAddOpen, setDeleteOpen, setEnterOpen]);

  useEventListener('click', handleClickChangeToAddBtn);

  const handleClickOpenEnterTab = (e) => {
    e.stopPropagation();
    setAddOpen(false);
    setEnterOpen(true);
  };

  const handleClickAdd = async (e) => {
    try {
      e.stopPropagation();
      if (!newCategoryTitle) {
        setAddOpen(true);
        setEnterOpen(false);
        setNewCategoryTitle('');
      } else {
        setAddOpen(true);
        setEnterOpen(false);
        const response = await dispatch(
          categoryCreateThunk({ name: newCategoryTitle, is_favorited: false })
        );
        dispatch(categorySelect({ ...response.data }));
        setNewCategoryTitle('');
        dispatch(categoriesRead.request());
      }
    } catch (error) {
      const errorMsg = error.hasOwnProperty('response')
        ? error.response.data.message
        : error.message;
      openToast({ type: 'error', message: errorMsg });
    }
  };

  const handleChangeNewCategoryTitle = useCallback((e) => {
    let checks = /[a-zA-Z]/;
    if (checks.test(e.target.value)) {
      if (e.target.value.length >= 14) return;
    } else if (e.target.value.length >= 7) return;
    setNewCategoryTitle(e.target.value);
  }, []);

  const onKeyUpAddTab = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode === 13) {
      handleClickAdd(e);
    }
  };

  const handleClickAddInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddOpen(true);
    setEnterOpen(false);
    setNewCategoryTitle('');
  };

  const handleClickdDelete = async (e) => {
    try {
      e.stopPropagation();
      await dispatch(categoryRemoveThunk({ categoryId: selectedCategory.id }));
      openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' });
      deleteCategoryToggle();
      setDeleteOpen(false);
      setAddOpen(true);
      const response = await dispatch(categoriesReadThunk());
      dispatch(categorySelect({ ...response[0] }));
    } catch (error) {
      const errorMsg = error.hasOwnProperty('response')
        ? error.response.data.message
        : error.message;
      openToast({ type: 'error', message: errorMsg });
    }
  };

  useEffect(() => {
    if (selectedCategory?.id) {
      setAddOpen(false);
      setDeleteOpen(true);
    }
  }, [selectedCategory]);

  return (
    <>
      <Button
        className={classes.addButton + (addOpen ? '' : ' ' + classes.hidden)}
        variant="contained"
        onClick={handleClickOpenEnterTab}
      >
        <AddCircleOutlineIcon style={{ color: '#cccccc' }} />
      </Button>
      <Button
        className={classes.deleteButton + (deleteOpen ? ' ' + classes.block : '')}
        variant="contained"
        onClick={deleteCategoryToggle}
      >
        <DeleteIcon style={{ color: '#cccccc' }} />
      </Button>

      {enterOpen ? (
        <Paper className={classes.enterTab} component="div">
          <InputBase
            className={classes.input}
            placeholder="New one"
            value={newCategoryTitle}
            onChange={handleChangeNewCategoryTitle}
            onKeyUp={onKeyUpAddTab}
            onClick={handleClickAddInput}
          />
          <Button className={classes.okBtn} onClick={handleClickAdd}>
            확인
          </Button>
          <Button className={classes.cancelBtn} onClick={handleClickCancel}>
            취소
          </Button>
        </Paper>
      ) : null}

      <AlertModal
        openBool={deleteCategoryOpen}
        btnYesText="삭제"
        contentText="카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?"
        handleClose={deleteCategoryClose}
        handleYesClick={handleClickdDelete}
      />
    </>
  );
}
