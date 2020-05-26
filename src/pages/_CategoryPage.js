// import React, {useState} from 'react';
// import './Category.scss';
// import { CategoryTab, CategoryCard, AlarmCard} from '../components/category';
// import {AlertModal} from '../components/modal';
// import addBtn from '../images/add.png';
// import search from '../images/search.png';
// import cardImage from '../images/card-image.jpg'
// import alarm from '../images/alarm.png';
// import person from '../images/person.png';
// import history from '../images/history.png';
// import infoPerson from '../images/info-person.jpg'


// export default function CategoryPage() {

//   const [addTab, setAddTab] = useState(true);
//   const [addEnter, setAddEnter] = useState(false);
//   const [searchHead, setSearchHead] = useState(false);
//   const [delModal, setDelModal] = useState(false);
//   const [info, setInfo] = useState(false);
//   const [alarms, setAlarm] = useState(false);

//     const hideTab = () => {
//       setAddTab(!addTab);
//       setAddEnter(!addEnter);
//       console.log(addTab)
//     }   

//     //input enter키 입력할경우도 토글해야함
//     const hideEnterTab = () => {
//       setAddTab(!addTab);
//       setAddEnter(!addEnter);
//       console.log(addTab,addEnter)
//     }    

//     //드래그시 카테고리탭 효과 추가 예정


//     const toggleSearch = () => {
//       setSearchHead(!searchHead)
//     }

//     // 외부영역 클릭시 열려있는 것 닫는 함수 추가 예정

   

//     const toggleDeleteModal = () => {
//       setDelModal(!delModal);
//     }

//     const toggleInfoModal = () => {
//       setInfo(!info);
//     }

//     const toggleAlarmModal = () => {
//       setAlarm(!alarms);
//     }



//   return (
//     <div className="container container-layout">
      

//       <section className="list-tab-layout">
//         <div className="favorite-text">
//           Favorite
//         </div>
//         <hr />
//         <div className="drag-box">
//           Drag the category here!
//         </div>

//         <div className="category-text">
//           Category
//         </div>
//         <hr />

//         <CategoryTab text="one" toggleDeleteModal={toggleDeleteModal} />
//         <CategoryTab text="two" toggleDeleteModal={toggleDeleteModal} />
//         <CategoryTab text="three" toggleDeleteModal={toggleDeleteModal} />
        
//         <AlertModal 
//         text="카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?" 
//         btnLeft="취소" 
//         btnRight="삭제"
//         delModal={delModal}
//         toggleDeleteModal={toggleDeleteModal} />
        
//         <div className={"add-list-tab " + (addTab ? '' : 'hidden')} onClick={hideTab}>
//           <img src={addBtn} alt="add button"></img>
//         </div>
//         <div className={"add-list-enter " + (addEnter ? '' : 'hidden')} >
//           <input placeholder="카테고리 이름"></input>
//           <button type="button" className="add-true" onClick={hideEnterTab}>확인</button>
//           <button type="button" className="add-false" onClick={hideEnterTab}>취소</button>
//         </div>
               
//       </section>


//       <section className="card-tab-layout">
//         <header>
//           <div className="category-title">카테고리</div>
//           <div className={"search-box " + (searchHead ? 'search-box-shadow' : '')}>
//             <div className="search-head" onClick={toggleSearch}>
//               <img src={search} alt="search"></img>
//               Search
//             </div>
//             <div className={"search-body " + (searchHead ? '' : 'hidden')}>
//               <input></input>
//               <div className="search-filter">
//                 <button type="button">전체</button>
//                 <button type="button">도메인</button>
//                 <button type="button">단어</button>
//               </div>
//             </div>
//           </div>
//           <div className="tab-btn-group">
//             <button type="button">탭 열기</button>
//             <button type="button">탭 삭제</button>
//           </div>
//         </header>

//         <div className="card-box">
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//           <CategoryCard 
//             img={cardImage} 
//             title="얍 웹1팀의 홈페이지" 
//             desc="카테고리 카드형에 웹사이트 설명이 들어가는 곳입니다. 최대 3줄이 들어가야할 것 같습니다." 
//             url="naver.com"/>
//         </div>

//       </section>
// {/* 
//       <section className="history-tab-layout">

//       </section> */}


//       <section className="drawer-tab-layout">
//         <div className="drawer-btn-group">
//           <button type="button" >
//             <img src={history} alt="history button"></img>
//           </button>
//           <button type="button" onClick={toggleAlarmModal}>
//             <img src={alarm} alt="alarm button"></img>
//           </button>
//           <button type="button" onClick={toggleInfoModal}>
//             <img src={person} alt="person button"></img>
//           </button>
//         </div>


//         <div className={"alarm-box " + (alarms ? 'show' : '')}>
//           <div className="alarm-title">알람</div>
//             <div className="alarm-body">
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//               <AlarmCard title="얍 웹1팀의 홈페이지" date="2020.5.1" />
//             </div>            
//         </div>

//         <div className={"info-box " + (info ? 'show' : '')}> 
//           <div className="info-title">내 정보</div>
//           <div className="info-body">
//             <img src={infoPerson} alt="person button"></img>
//             <div className="info-contents">
//               <p className="name">안수빈</p>
//               <p className="email">tnqls0120@naver.com</p>
//             </div>
//           </div>
//           <button>로그아웃</button>
//         </div>
        

//       </section>
//     </div>
//   )
// }