# urLink Chrome Extension

![image](https://user-images.githubusercontent.com/51507260/113473528-fb80c600-94a4-11eb-96da-b84e7d561bf9.png)

<a href="https://chrome.google.com/webstore/detail/urlink/eimpopfllbjbhgkgomhhpolhlpaapdai?hl=ko">
    <img src="https://user-images.githubusercontent.com/51507260/113473606-6f22d300-94a5-11eb-969f-10e81788a669.png" alt="urlink logo" title="Aimeos" align="left" height="60" />
</a>

# &nbsp; urLink


### 🤔 내가 보관한 링크, 어디다 뒀더라..?

북마크, 메모장, 카카오톡 내게 쓰기, 노션 등.. 언젠가 보려고 여기저기 저장한 링크들, 찾으려고 하면 어디에 있는지 도저히 기억이 안나시나요? 이제 한 곳에서 한 번에 정리하고 사용하세요. 

유어링크를 사용하면 쉽고 빠르게 웹사이트를 정리할 수 있음은 물론이고, 깔끔하게 정리된 링크들을 보며 자기유능감까지 느낄 수 있습니다!

urlink(유어링크)는 인터넷에서 리서치할 때, 나중에 다시 보고 싶은 웹사이트를 발견했을 때, 쉽게 보관하고 정리하고 사용할 수 있도록 돕는 리서치 생산성 향상 서비스입니다. 

(유어링크는 PC 환경, 크롬 브라우저에서만 사용할 수 있는 '크롬 확장 프로그램'입니다.)

### 🔍 리서치에만 집중하세요. 발견한 정보는 유어링크가 정리해드릴게요.

정보를 검색하는 것 만으로도 충분히 바쁜데, 정리하는데 시간을 많이 쓸 필요는 없죠! 유어링크를 이용하면 리서치하다 발견한 유용한 정보를 쉽고 빠르게 보관, 정리할 수 있고 나중에 언제든지 꺼내볼 수 있어요.

대학생, 직장인, 마케터, 개발자, 디자이너 등 인터넷에서 자료를 찾고, 보관하고 정리하는데 어려움을 느끼시는 분이라면 누구나 유용하게 사용할 수 있어요!

# 🎨 Features

### 1. 담고 싶은 웹사이트를 클릭 한 번으로 정리!

- #### **유어링크 버튼을 활용해 링크 저장하기**

주소 표시줄 우측에 있는 **유어링크 버튼을 클릭**하면, 그 자리에서 내가 원하는 카테고리에 웹사이트 를 담을 수 있어요. 저장한 링크는 **[유어링크 열기]** 버튼을 눌러 확인할 수 있습니다.

![feature01](https://user-images.githubusercontent.com/51507260/113473947-b0b47d80-94a7-11eb-9468-21a8f7ae82b1.gif)

<br />

- #### **방문기록을 드래그하여 링크 저장하기**

이전에 방문한 웹사이트를 쉽게 보관할 수 있어요. 우측 타이머 아이콘을 눌러 방문기록 리스트를 불러온 다음 원하는 링크를 왼쪽으로 드래그앤드랍하세요. 끌어다 놓기만 하면 내가 원하는 카테고리에 쉽게 링크를 보관할 수 있어요!

![feature02](https://user-images.githubusercontent.com/51507260/113473992-00934480-94a8-11eb-8c00-2b26211e87c4.gif)

### 2. 자주 보고 싶은 정보는 카드에 있는 페이보릿 버튼을 클릭하여 보관하세요.

카테고리 페이지 최상단에 카드가 배치 되어 내가 원하는 정보에 쉽게 접근할 수 있어요.

![image](https://user-images.githubusercontent.com/51507260/113474270-00944400-94aa-11eb-8ed3-30fb34f4abd2.png)

### 3. 까먹어도 괜찮아요! 알람이 알려줄 거에요.

보고싶은 정보를 원하는 시간에 받아보세요. 알람 기능을 이용해 원하는 날짜와 시간을 입력하면, 그 시간에 내가 읽고싶은 정보를 보내드려요. 알람을 이용해 잊혀지던 정보를 효율적으로 사용하세요.

<p align="center" width="800px">
  <img src="https://user-images.githubusercontent.com/51507260/113473997-04bf6200-94a8-11eb-8065-6e89888af2f9.gif"
  width="55%" />
  <img src="https://user-images.githubusercontent.com/51507260/113476268-6934ee00-94b5-11eb-8d1e-14f08e99334a.gif" width="35%" />
</p>

<br><br>

# 🧑‍💻 Get start

`development` 환경에서는 `chrome api` 기능을 사용 할 수 없어 `build`를 하고 크롬 익스텐션 개발 모드로 확인 가능합니다. 

### development 
```
npm i
npm run start
```

### production [build]
```
npm i
npm run build
```
### chrome development
```
 1. 크롬 실행
 2. 확장 프로그램
 3. 압축해지된 확장 프로그램을 로드합니다[클릭]
 4. build 된 폴더 선택
 ```

# 🗂 Component Architecture

- [eslint + prettier code convention](https://github.com/urLink-DEV/urLink-frontend/pull/120)
  - `코드 스타일` 통일

- [Git flow](https://www.notion.so/Git-flow-dbc4389bac1e4d0b8e570a8157f8b40c)
  - 깃 전략을 통해 브런치 히스토리 `버전관리`가 가능

- [폴더 구조](https://github.com/urLink-DEV/urLink-frontend/pull/116)
  - 컴포넌트 분리 스타일을 통일하여 `CategoryList`, `linkList`, `AppBar`영역을 명확하게 나눔 <br/>
    ✨ 협업에서 일어나는 `code conflict` 현상을 줄여줌
  
  - `Container + Component` 구조에서 `hooks(redux) + Component` 구조로 변경 <br/>
     ✨ Container에서 코드 길이가 방대해짐을 hooks를 사용하여 모듈 관리로 코드 길이를 줄 일 수 있었음

- [modules(redux) code convention](https://www.notion.so/modules-code-convention-fe4a0bad389445258d1752909c863209)
  - `state`를 내리는 구조로 설계되어  `props drilling` 현상이 일어나 하나의 컴포넌트에서 의존성 결합이 많이 되었음 <br/>
    ✨ `redux` 관리로 전역 상태 관리를 통해 컴포넌트간의 의존성 관계를 줄여줌  
  -  `ContextAPI` ➡ `redux` + `redux-thunk` + `redux-saga` <br/>
    ✨ `Provider`를 여러개로 만들어 내리는 구조보다 `하나의 Redux Provider`로 `useSelector`, `useDispatch` 하는것이 더 코드가 깔끔하고 `hooks` 와 state  메모제이션이 되어 선택
  - API 통신을 모듈화하여 `컴포넌트`와 `서버 통신(redux-saga)`의 관심사 분리 <br/>
    ✨ 컴포넌트는 `dispatch`로 api 통신을 하고 `api 통신 내용`은 `redux-saga`로 관리

- [로그인 유지](https://github.com/urLink-DEV/urLink-frontend/pull/116)
  - 캐시로 저장된 토큰유무에따라 로그인 유지 결정하여 페이지 깜빡이는 현상 없앰
 
- [chromeApis 모듈화](https://github.com/urLink-DEV/urLink-frontend/pull/116)
  - `development`에서는 `chrome api`가 지원 되지 않으므로 `Promise` 혹은 `분기` 로 `development`와 `production` 모드에 따라 값을 다르게 리턴 <br/>
    ✨ 컴포넌트의 관심사 분리가 가능해짐 

- [webpack(craco)](https://github.com/urLink-DEV/urLink-frontend/issues/119)
  - `package.json`에서 `babel`과` webpack` 오버라이드를 `craco`를 사용하여 한곳에서 관리하도록 설정
  - single point 에서 [multiEntry point](https://github.com/urLink-DEV/urLink-frontend/pull/120)로 변경하여 `popup` + `background` + `main` 3개의 프로젝트를 한 번에 빌드 할 수 있게 설정 <br/>
    ✨  개발 유지보수 효율 높임 
  - BundleAnalyzerPlugin 추가 <br/>
    ✨ 번들링 크기 최적화 할때 그래픽으로 확인
 