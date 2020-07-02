import React , {useRef} from 'react'
import {Link, Router} from 'react-chrome-extension-router'

import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import './styles/swiper.scss'
import useStyles from './styles/GetstartPage'

import mainLogo from '../images/mainLogo.png'
import main1 from '../images/main1.png'
import main2 from '../images/main2.png'
import main3 from '../images/main3.png'
import main4 from '../images/main4.png'
import main5 from '../images/main5.png'

import SignupContainer from '../containers/SignupContainer'

export default function GetStartPage() {
  const classes = useStyles()
  const swiper = useRef(null)

  const goNext = () => {
    if (swiper.current !== null && swiper.current.swiper !== null) {
      swiper.current.swiper.slideNext()
    }
  }
  const goPrev = () => {
    if (swiper.current !== null && swiper.current.swiper !== null) {
      swiper.current.swiper.slidePrev()
    }
  }

  const params = {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 100,
    pagination: {
      el: '.swiper-pagination.slide-pagination',
      clickable: true
    }
  }

  return (
    <Router>
      <div className={classes.root}>

        <div className={classes.titleCenter}>
          <img src={mainLogo} alt="main logo"></img>
          <Link component={SignupContainer} className={classes.getStartBtn}>
            <div className={classes.getStartText}>
              <span className={classes.textBlack}>Get</span> <span className={classes.textBlue}>Started!</span>
            </div>
          </Link>
        </div>

        <div className="swiper-container-c">
          <button onClick={goNext} className="swiper-button-next prev-btn"></button>

          <Swiper {...params} ref={swiper}>
            <div className={classes.textGrp}>
              <div className={classes.textCenter}>
                <span><span className={classes.textBold}>드래드 앤 드랍</span>으로 방문기록을 쉽게 정리하세요.</span>
              </div>
              <div className={classes.textCenter}>
                <span>방문기록을 내가 만든 탭과 페이지로 끌어다놓기만 하면 정리 끝!</span>
              </div>
              <div className={classes.imgCenter}>
                <img className={classes.imgAutoSize} src={main1} alt="main-1"></img>
              </div>
            </div>

            <div className={classes.textGrp}>
              <div className={classes.textCenter}>
                <span><span className={classes.textBold}>카드 형태로</span> 내가 보관한 정보를 한 눈에 확인할 수 있어요.</span>
              </div>
              <div className={classes.textCenter}>
                <span>내가 보관했던 정보가 무엇인지 쉽게 기억할 수 있도록 도와줍니다.</span>
              </div>
              <div className={classes.imgCenter}>
                <img className={classes.imgAutoSize} src={main2} alt="main-2"></img>
              </div>
            </div>

            <div className={classes.textGrp}>
              <div className={classes.textCenter}>
                <span><span className={classes.textBold}>알람을</span> 설정하여 보관한 정보를 잊지말고 기억하세요.</span>
              </div>
              <div className={classes.textCenter}>
                <span><span className={classes.textBold}>“언젠가는 읽겠지…”</span>하며 쌓여갔던 URL을 유어링크가 배달해드릴게요.</span>
              </div>
              <div className={classes.imgCenter}>
                <img className={classes.imgAutoSize} src={main3} alt="main-3"></img>
              </div>
            </div>

            <div className={classes.textGrp}>
              <div className={classes.textCenter}>
                <span><span className={classes.textBold}>검색은</span> 수월하게, 중요한 건<span className={classes.textBold}> Favorite</span>으로 한번 더.</span>
              </div>
              <div className={classes.textCenter}>
                <span>검색기능으로 정보를 꼼꼼히 찾을 수 있고, 카테고리 별 우선순위도 정할 수 있어요.</span>
              </div>
              <div className={classes.imgCenter}>
                <img className={classes.imgAutoSize} src={main4} alt="main-4"></img>
              </div>
            </div>

            <div className={classes.textGrp}>
              <div className={classes.imgCenter}>
                <img className={classes.imgAutoSize} src={main5} alt="main-5"></img>
              </div>
            </div>
          </Swiper>

          <button onClick={goPrev}  className="swiper-button-prev next-btn"></button>
        </div>
    </div>
  </Router>
  )
}
