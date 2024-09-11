# 1. 리액트 입문
## 리액트 컴포넌트
```javascript
// Hello.js
// 리액트 컴포넌트 불러오기
import React from 'react';

// JSX 형식으로 값을 반환 
function Hello() {
    return <div>안녕하세요<div>
}

// Hello라는 컴포넌트 내보내기
export default Hello;
```
컴포넌트는 일종의 UI 조각. 내보낸 컴포넌트는 아래처럼 사용이 가능하다.
```javascript
// App.js
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />  // 여기!
    </div>
  );
}

export default App;
```
리액트 컴포넌트가 어떻게 실제로 렌더링이 되는가?!
```javascript
// index.js
...
ReactDOM.render(<App />, document.getElementById('root'));
...

// index.html
<div id="root"></div>
```
id 가 root인 DOM에 App을 렌더링

## JSX 기본 규칙
```javascript
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';  
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }
  return (
    <>                      {/* fragment */}
      <Hello />             {/* self-closing 태그 */}
      <div>안녕히계세요</div>
      <div style={style}>{name}</div>     {/* {}로 감싸 js 변수 사용 */}
      <div className="gray-box"></div>    {/* Camel Case */}
      <Hello // 열리는 태그 내부에서의 주석
      />
    </>
  );
}

export default App;
```

## Props를 통해 컴포넌트에 값 전달하기
기본
```javascript
// App.js
...
function App() {
  return (
    <Hello name="react" />
  );
}
...

// Hello.js
...
function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}
...
```
비구조화 할당으로 컴포넌트에 값 전달
```javascript
// Hello.js
function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}
Hello.defaultProps = { // 디폴트 props
  name: '이름없음'
}
```
컴포넌트 태그 사이에 넣은 값 조회 - `props.children`
```javascript
// Wrapper.js
...
function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {children}        {/* 여기 !! */}
    </div>
  )
}
export default Wrapper;
...

// App.js
...
function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}
...
```

## 조건부 렌더링
JSX에서 `null`, `false`, `undefined`를 렌더링하면 아무것도 나타나지 않음
```javascript
function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial ? <b>*</b> : null }
      {/* 조건이 맞는 경우만 보여준다면 이렇게도 쓸 수 있다.
       {isSpecial && <b>*</b>} 
        */}
      안녕하세요 {name}
    </div>
  );
}
```
(참고) props값 설정을 생략하면 ={true}
```javascript
// isSpecial={true} 와 동일
<Hello name="react" color="red" isSpecial />
```

## useState를 통해 컴포넌트에서 바뀌는 값 관리하기
Hooks 기능으로 함수형 컴포넌트에서도 상태 관리 가능
```javascript
import React, { useState } from 'react';

function Counter() {
  // number: state value, setNumber: setter
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
    // 함수형 업데이트도 가능
    // setNumber(prevNumber => prevNumber + 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
    </div>
  );
}
```

## input 상태 관리
input의 상태가 바뀌었을 때를 추적

`e.target` : 이벤트가 발생한 DOM을 가리킴

```javascript
import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text}  />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```

## 다중 input 관리
리액트 상태에서 객체를 수정할 시 새로운 객체를 만들어 setter에 적용해야 함.
```javascript
...
function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
    </div>
  );
}
...
```

## useRef로 특정 DOM 선택하기
```javascript
import React, { useState, useRef } from 'react';

function InputSample() {
  // ref 객체 만들기
  const nameInput = useRef();
  ...
  const onReset = () => {
    ...
    // nameInput.current: reference하는 DOM을 가리킴
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        ref={nameInput}
      />
    </div>
  );
}
```

## 배열 렌더링
동적 렌더링을 고려한 방법
```javascript
function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    ...
  ];
  
  // map 을 써서 각 원소를 컴포넌트로 매핑, key: 각 원소의 고유값 (e.g. id)
  return (  
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
  // 만약! 원소의 고유값이 없다면 `map()`에 사용하는 콜백함수 두 번째 파라미터 `index` 사용가능!
  /*
  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  )
  */
}
```
**key를 사용하는 이유**
key가 없다면  - 배열의 원소 업데이트 시 삽입 위치부터 컴포넌트를 다시 생성해 렌더링함
key를 사용하면 - 배열의 원소 업데이트 시 수정이 필요한 컴포넌트만 생성,삭제함 

## useRef로 컴포넌트 안의 변수 만들기
useRef로 관리하는 변수
- 값이 바뀌어도 컴포넌트가 리렌더링 X, 바로 조회 가능
```javascript
const nextId = userRef(4);  // 4: initial value
```

## 불변성을 유지하는 배열 state 조작
```javascript
// 항목 추가: 불변성을 지키기 위해 `spread` 나 `concat` 을 사용
const onCreate = () => {
  const user = {
    id: nextId.current,
    username,
    email
    };

  setUsers([...users, user]);    // 방법1
  setUsers(users.concat(user));  // 방법2
  ...
};

// 항목 제거: 불변성을 지키기 위해 `filter` 사용
const onRemove = id => {
  setUsers(users.filter(user => user.id !== id));
};

// 항목 수정: 불변성을 지키기 위해 `map` 사용
const onToggle = id => {
  setUsers(
    users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    )
  );
};
```

## useEffect를 사용해 마운트/언마운트/업데이트 시 작업 설정하기
마운트: 컴포넌트가 처음 나타남  
언마운트: 컴포넌트 사라짐  
업데이트: 특정 props가 바뀔 때

```javascript
useEffect(() => {
  console.log('user 값이 설정됨');
  console.log(user);
  return () => {  // cleanup 함수
    console.log('user 가 바뀌기 전..');
    console.log(user);
  };
}, [user]);  // deps 배열, 컴포넌트가 처음 나타날 때, 값이 바뀌기 직전 호출됨
```
마운트 시 하는 작업
* props 로 받은 값을 컴포넌트의 로컬 상태로 설정
* 외부 API 요청 (REST API 등)
* 라이브러리 사용 (D3, Video.js 등...)
* setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

언마운트 시에 하는 작업들
* setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
* 라이브러리 인스턴스 제거