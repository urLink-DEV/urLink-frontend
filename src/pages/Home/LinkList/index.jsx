import React from 'react'
import Grid from '@material-ui/core/Grid'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import Link from './Link'
import useStyles from './style'

function Main() {

  const classes = useStyles();
  const links = [1, 2]
  
  return (
    <>
      <LinkDropZone />
      <main className={classes.content}>
        <div position="static">
          <Header />
        </div>
        <div container>
          <Link />
          {/* { 
            links.length ? links?.map((linkObj, idx) => 
              <Grid item key={idx} className={classes.gridCard}>
                <CategoryCard key={idx}
                  linkInfo={linkObj}
                  handleSelectedCard={handleSelectedCard(linkObj)}
                  isReset={isReset}
                  setIsReset={setIsReset}
                  writeAlarm={writeAlarm}
                />
                <Card />
              </Grid>) 
            : categories.length === 0 ? 
              <img className={classes.imgCenter} 
                src={CategoryEmptyIcon} 
                alt='category list empty'
              />
            :  searchValue ? 
              <img className={classes.imgCenter}
                src={linkListSearchEmptyIcon} 
                alt='link list search empty'
              />
          : <img className={classes.imgCenter}
              src={linkListEmptyIcon} 
              alt='link list empty'
            />
          } */}
        </div>
      </main>
    </>
  )
}

export default Main