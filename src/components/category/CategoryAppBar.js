import React, {useState,useEffect} from 'react'
import useStyles from 'styles/CategoryAppBar'
import alarm from '../../images/alarm.png'
import person from '../../images/person.png'
import history from '../../images/history.png'
import CategoryHistory from 'CategoryHistory'
import CategoryHistoryList from 'CategoryHistoryList'


export default function CategoryAppBar(props) {
  const classes = useStyles()
  const [historyOpen, setHistoryOpen] = useState(false)
  const {setDraggedHistory, getHistory} = props          
  const [urlList, setUrlList] = useState([])

  const onClickHistoryDrawer = () => {
    setHistoryOpen(!historyOpen)
  }

  useEffect(() => {
    if(historyOpen){
      getHistory({text: "", callback : (historyItems) => {
        setUrlList(historyItems)
      }, maxResults: 100})
    }
  }, [historyOpen])

  return (
    <div>
      <div className={classes.appBar}>
        <div className="drawer-btn-group">
          <button onClick={onClickHistoryDrawer}>
            <img src={history} alt="history button" />
          </button>
          <button>
            <img src={alarm} alt="alarm button" />
          </button>
          <button>
            <img src={person} alt="person button" />
          </button>
        </div>
      </div>

      <CategoryHistory open={historyOpen} onClickHistoryDrawer={onClickHistoryDrawer}>
        <CategoryHistoryList 
          urlList={urlList}
          setDraggedHistory={setDraggedHistory}
        />
      </CategoryHistory>
    </div>
    
  )
}