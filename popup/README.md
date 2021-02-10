# plugin popup

- urlLink 플러그인 눌렀을 때, 뜨는 창
- 현재 보고 있는 창의 정보를 카테고리에 담는 기능

![ezgif com-gif-maker](https://user-images.githubusercontent.com/31876632/107482030-7541b500-6bc2-11eb-86f8-1d4614967dcc.gif)

**development**

```
npm i
npm run start
```

**production**

```
npm run build
```

## Spec

- VanillaJs (>= ES6)

## Rule

- [x] Eslint 설정
- [x] webpack 설정
- [x] package npm 설정
- [x] SPA 구조 설정

## Architecture

- [x] 전역 상수 세팅 => setting.js
- [x] http 세팅 => axios
- [x] modules => api 분리
- [x] chromeApis

## 기능

- [x] token 검사
- [x] 카테고리 리스트 불러오기
- [x] 카테고리에 링크 담기
- [x] 빌드 버전, 디벨럽 버전 링크 담는 표시 다른지 확인
