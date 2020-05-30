import React, {useState} from 'react'
import CategoryHistory from './CategoryHistory'
import CategoryHistoryList from './CategoryHistoryList'
import useStyles from './styles/CategoryAppBar'
import alarm from '../../images/alarm.png'
import person from '../../images/person.png'
import history from '../../images/history.png'

export default function CategoryAppBar(props) {

  const classes = useStyles()
  const {urlList} = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const onClickHistoryDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <div>
      <div className={classes.appBar}>
        <div className="drawer-btn-group">
          <button onClick={onClickHistoryDrawer}>
            <img src={history} alt="history button" />
          </button>
          {/* <button onClick={onClickAlarmBtn}>
            <img src={alarm} alt="alarm button" />
          </button>
          <button onClick={onClickProfileBtn}>
            <img src={person} alt="person button" /> */}
          {/* </button> */}
        </div>
      </div>
      <CategoryHistory open={openDrawer} onClickHistoryDrawer={onClickHistoryDrawer}>
        <CategoryHistoryList urlList={urlList}/>
      </CategoryHistory>
    </div>
    
  )
}