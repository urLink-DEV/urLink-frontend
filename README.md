# UrLink Chrome Extension

## Git Branch 관리

```
master
develop
release/**
feature/**
bugfix/**
hotfix/**
```

- `master` 브랜치는 현재 운영중인 프로덕션 브랜치이다. (1.x.x 버전에 한해)
- `develop` 브랜치는 현재 개발 후 테스트 완료하여 릴리즈를 기다리고 있는 브랜치이다.
- `release` 브랜치는 develop에 개발된 기능들을 프로덕션에 올려지게될 브랜치이다. (이후 master 브랜치 관리 논의 필요)
- `feature` 브랜치는 develop에 머지되기 전 특정 기능들을 개발할 때 사용하는 브랜치이다.
- `bugfix` 브랜치는 develop에 있는 기능들 중 버그가 발생했을 때, 정기배포를 할 때 발견되는 버그들을 고칠 때 사용하는 브랜치이다.(릴리즈 전 개발 완료한 상태에서 버그 발견 or 프로덕션에서 발견한 급하지 않은 버그&이슈 관련 브랜치)
- `hotfix` 브랜치는 현재 master 브랜치에서 운영중인 기능에서 버그가 발견되어 긴급하게 고쳐져야할 브랜치이다. (운영중인 상태에서 버그 발견)

### 브랜치 명명 방법

- 기능에 따라 영어로 알아볼 수 있도록 적당히 `feature/link-card-drag-drop` 이런식으로 단어 사이엔 `-`를 붙여서 브랜치명을 명명한다.
- 해당 브랜치에서 주제에 맞게 커밋명을 작성하여 커밋을 올린다.
  - 커밋명의 경우 Git Emoji를 활용하여 커밋명의 의미를 명확히 한다. Git Emoji는 아래의 종류 중 커밋의 주제에 맞게 하나를 선택하여 깃이모지 + 커밋명 형식으로 작성한다.
  - 커밋명은 한국어로 알아보기 쉽고 간단하게 적는다.
  - Git Emoji :
    - :tada: `:tada:` 프로젝트 세팅, 커다란 배포, 릴리즈 후
    - :rocket: `:rocket:` 정기배포 후
    - :construction: `:construction:` : 기능을 만드는 중 미완성인 상태로 커밋을 할 때
    - :fire: `:fire:` 핫픽스 이슈를 고쳤을 때
    - :bug: `:bug:` 버그 이슈를 고쳤을 때
    - :sparkles: `:sparkles:` 기능단위 페이지 구현 완료, API 추가 완료 후
    - :white_check_mark: `:white_check_mark:` 테스트 코드 작성 완료 후
    - :zap: `:zap:` 기존에 있는 기능을 개선했을 때
    - :recycle: `:recycle:` 코드 리팩토링을 했을 때
    - :lipstick: `:lipstick:`스타일링을 수정했을 때
    - :dizzy: `:dizzy:` 애니메이션 기능을 추가하였을 때 (ex. 드래그앤드롭 기능, 슬라이드 기능 등)
    - :speech_balloon: `:speech_balloon:` 주석 관련, 용어 관련 커밋 (i18n)

## 크롬 확장프로그램에 업로드 할 때 참고할 사항

- npm , node, git 다운로드
  커멘드에서 git 만 쳐서 에러가 안 나면 성공
  커멘드에서 node 만 쳐서 에러가 안 나면 성공
  커멘드에서 npm 만 쳐서 에러가 안 나면 성공
  (성공이 안 나면 구글에서 키워드 ex. git download or npm download)

1. 폴더를 새로 만든 후, git을 받아온다.

- git clone https://github.com/urLink-DEV/urLink-frontend.git

2. urLink-frontend 폴더로 이동

- cd urLink-frontend
- git checkout develop

3. 패키지 다운
   npm i
4. 패키지 빌드
   npm run build
5. 확장 프로그램 > 압축해지된 확장 프로그램을 로드합니다. 클릭

- urLink-frontend/build 폴더를 선택

* 최신상태 받기

1. git branch (develop 인지 확인)
2. 확인 후, git pull origin develop
3. npm run build
4. 다시 크롬 익스 확인하면 최신 업데이트 상태를 볼 수 있음
