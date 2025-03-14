# react
사용자 정의 태그 만들기

시작: 디렉토리 지정 후 npm start
class와 function 중 function을 react를 다루는 방식
사용자 정의 태그 = 컴포넌트
태그 입력값 속성 = prop

state: prop과 함께 컴포넌트 함수를 실행해서 만들어 return 하는 것, 컴포넌트를 만드는 내부자를 위한 것
prop: 컴포넌트를 사용하는 외부자를 위한 데이터

import useState from react
state를 이용해 함수 실행 도중 변수의 값을 바꿔서 이에 따라 출력

props로 데이터를 받아 state로 변형하여 사용할 때 onChange, event.target.value 사용

코딩 방식:
컴포넌트 정의
컴포넌트 사용되는 곳에서 입력값 지정