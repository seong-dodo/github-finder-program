# 깃허브 친구 찾기 프로그램

![](https://images.velog.io/images/seong-dodo/post/d0c4e886-e0d7-4617-9332-64d91a8627c7/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB-%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8-2021-10-18-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-10.00.17.gif)

## 1. 프로젝트 목표

- 요구 사항 구현을 위한 전략을 세워 바닐라 자바스크립트로 코드 구현
- LocalStorage를 이용해서 즐겨찾기 기능 구현

<br />


## 2. 요구 사항
각 step의 '요구 사항 구현을 위한 전략'은 이슈에서 관리하고 있습니다.

<br />

### ⛳  step 1 - 검색 폼 구현

- 검색 입력창에서 사용자 이름을 입력할 수 있다.
- 검색 입력창에 사용자 이름을 입력하고 찾기 버튼을 클릭할 수 있다.
    - 찾기 버튼을 클릭하면 깃허브에 사용자를 검색할 수 있다.
    - 찾기 버튼을 클릭하면 즐겨찾기 리스트의 사용자를 검색할 수 있다.

### ⛳  step 2 - 서버 리스트 구현

- 깃허브 사용자 검색 api 응답을 받아 사용자 리스트를 이름순으로 최대 100까지 확인할 수 있다.
- 각 사용자 리스트는 프로필 이미지, 사용자 이름, 즐겨찾기 버튼으로 구성되어져 있다.
- 각 사용자의 즐겨찾기 버튼을 클릭하면 즐겨찾기에 저장 할 수 있다.
- 이미 즐겨찾기가 된 사용자의 즐겨찾기 버튼을 클릭하면 즐겨찾기를 취소할 수 있다.

### ⛳  step 3 - 탭 기능 구현 

- 초기 화면 탭은 깃허브 탭으로 되어 있다.
- 깃허브 탭일 경우 검색 입력폼만 보여진다.
- 즐겨찾기 탭일 경우 즐겨찾기에 저장된 리스트가 있으면 즐겨찾기 전체 리스트를 보여준다.

### ⛳  step 4 - 로컬 리스트 구현

- 즐겨찾기 탭에서 즐겨찾기에 추가된 사용자 전체 리스트 또는 검색어와 일치하는 리스트를 이름순으로 확인할 수 있다.
- 즐겨찾기 된 사용자 리스트는 프로필 이미지, 사용자 이름, 즐겨찾기 버튼으로 구성되어져 있다.
- 즐겨찾기 된 사용자의 즐겨찾기 버튼을 클릭하면 즐겨찾기 리스트 목록에서 지울 수 있다.


