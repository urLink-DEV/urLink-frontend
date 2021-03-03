import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import Link from './Link'
import useStyles from './style'
import { useCategories, selectSelectedCategory } from '@modules/category'
import { useLinks } from '@modules/link'
import CategoryEmptyImg from '@images/group-5.svg'
import linkListEmptyImg from '@images/group-11.png'
import linkListSearchEmptyImg from '@images/group-17.png'

function LinkList() {
  const classes = useStyles()
  const { categories } = useCategories()
  const selectedCategory = useSelector(selectSelectedCategory)
  const { links } = useLinks({ categoryId: selectedCategory?.id })
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <LinkDropZone />
      <main className={classes.content}>
        <Header />
        <Grid container spacing={2}>
          {categories.length === CATEGORY_EMPTY && (
            <Grid item xs={12} className={classes.center}>
              <img src={CategoryEmptyImg} alt="카테고리 비어 있음" />
            </Grid>
          )}

          {links?.map((data) => (
            <Grid item key={data.id}>
              <Link data={data} />
            </Grid>
          ))}

          {links.length === LINK_EMPTY &&
            (searchValue ? (
              <Grid item xs={12} className={classes.center}>
                <img src={linkListSearchEmptyImg} alt={`${searchValue} 검색 조회 없음`} />
              </Grid>
            ) : (
              <Grid item xs={12} className={classes.center}>
                <img src={linkListEmptyImg} alt="링크 비어 있음" />
              </Grid>
            ))}
        </Grid>
      </main>
    </>
  )
}

const CATEGORY_EMPTY = 0
const LINK_EMPTY = 0

export default LinkList
