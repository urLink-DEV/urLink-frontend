import React from 'react'
import Grid from '@material-ui/core/Grid'
import LinkDropZone from './LinkDropZone'
import Header from './Header'
import Card from './Card'
import useStyles from './style'

function Main({title}) {

  const classes = useStyles();
  const links = []
  
  return (
    <>
      <LinkDropZone />
      <main className={classes.content}>
        <div position="static">
          <Header title={title} />
        </div>
        <div container>
          { 
            links.length ? links?.map((linkObj, idx) => 
              <Grid item key={idx} className={classes.gridCard}>
                {/* <CategoryCard key={idx}
                  linkInfo={linkObj}
                  handleSelectedCard={handleSelectedCard(linkObj)}
                  isReset={isReset}
                  setIsReset={setIsReset}
                  writeAlarm={writeAlarm}
                /> */}
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
          }
        </div>
      </main>
    </>
  )
}

export default Main