# Generator

- https://medium.com/dailyjs/decoupling-business-logic-using-async-generators-cc257f80ab33
- https://exploringjs.com/es6/ch_generators.html#ch_generators
- https://exploringjs.com/es6/ch_for-of.html
- https://exploringjs.com/es6/ch_iteration.html

## 단어의 의미

Generator 의 사전적 의미는 발전기이다. 우리는 단어의 의미에서 굉장히 많은 개념과 동작원리를 유추할 수 있다.

[위키피디아](https://ko.wikipedia.org/wiki/%EB%B0%9C%EC%A0%84%EA%B8%B0)에서는 _발전기는 역학적 에너지를 전기 에너지로 변환하는 장치이다._ 라고 설명하고 있다.

## 시놉시스

- 동기와 비동기가 뭐지?
  - 어디서부터 출발됐지?
  - 자바스크립트에서는 어떻게 이해를 해야할까?
  - 이벤트 루프라는게 있고 이녀석이 바로 비동기를 처리해주는 역할을 해주지
    - 이건 엄연히 말해서 js 영역이 아니고
    - 브라우저나 node 와 같이 동시성 모델을 제공하기 위해 별도의 구축이 필요
- 그래서 이게 왜 필요한거야?
  - mdn 동시성 모델
- Promise 는 우리가 보통 async 처리를 위해 사용하자나
- Async/Await 이라는 건 뭔데?

## Why?

보통의 함수는 호출과 완료라는 일련의 과정이 즉시 일어난다. `sum` 함수를 예로 들어보자.

```js
function sum(a, b) {
  return a + b;
}
```

우리는 `sum` 이라는 함수를 작성할 때 `a` 값과 `b` 값의 합산을 호출과 리턴값으로 기대한다.

먼 과거의 imperative programing 으로 대부분의 처리가 가능했던 시절부터 익숙해져 있는 프로그래밍 패턴의 틀에서
모던 프로그래밍에서는 `async` 즉 비동기 형태의 프로그래밍이 요구되어지게 되었다.

### 비동기의 일반화

`sum` 함수를 이용해 설명을 이어가보자. 설명을 위해

만약 `sum` 의 2가지 인자 중 `a` 는 로컬 scope 에 존재하는 값이고 `b` 는 서버에서 내려주는 값이라고 가정해보자.

> 설명을 위해 일반적이지 않는 예시를 들 수 있지만 글의 의도에 집중하자, 혹은 본인이 상상할 수 있는 비동기 케이스를 접목해보자.

근데 서버에서 결정해주는 값 `b` 가 인터넷 환경, 서버 시스템의 유휴자원의 상태 등 여러한 상태에 따라 그 응답값이 어느 시점에
보장될 지 알수가 없다.

### Promise

이 문제는 일찍이 `Promise` 으로 해결할 수 있었다.

```js
new Promise((resolve, reject) => {
  if (ok) {
    resolve(b);
  } else {
    reject(new Error("reject"));
  }
})
  .then(() => {})
  .catch((err) => {});
```

다시 원래 이야기로 돌아가서 `sum` 은 볼래 두 인자를 합산하는 함수에 그쳤지만, 그 함수가 복잡한 현대의 프로그래밍 환경에서는
비동기 처리가 끼어들면서 동시 프로그래밍에서는 값 `a` 와 `b` 를 합산하려는 시점에 `b` 값을 기대할 수 없는 값으로 인지하고
처리를 해버리기 때문에 `sum` 함수의 목적이 손실된다.

Promise 가 없었다면 해결할 수 없는 문제이다.

### Async/Await

Promise 를 설명하거나 비동기 프로그래밍에 대한 설명을 할때 빼 놓을 수 없는 이야기이다. 이젠 널리 사용되기 때문에 그 개념과
동작원리를 깊게 알면 좋다.

아래의 2가지 링크에서 제공되는 자바스크립트 엔진의 이벤트 루프의 동작원리와 async/await 의 동작원리를 그림으로 이해해보면
좋을 것이다.

- https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
- https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gkeu

원래 주제로 되돌아 와서

자바스크립트로 프로그래밍을 할때 아주 일반적으로 서버에서 데이터를 가져오는 비동기를 처리하기 때문에 그 개념으로 설명할 수도 있지만
좀더 원론적으로 들어가 자바스크립트만 있다고 가정하고 앞서 예시를 든 `sum` 함수를 생각해보자. 그니까 서버도 없고 브라우저도 없다고 가정해보자는 것이다.

역시나 `b` 인자는 굉장히 복잡한 연산을 필요로 하는 녀석이라고 가정해보면 `b` 값이 할당되는 시점까지 자바스크립트 엔진은 그냥 CPU
를 자기것 마냥 점유해버릴 것이다. 그 시간이 지속되면 운영체제 타스크 메니저에는 "Not Response" 가 뜨면서 강제 종료하겠냐는
다이얼로그를 보여줄 지 모른다.

이건 원한것도 아니거니와 현시대에는 말도 안되는 처리 방식이다. 처리하기 전에 좀더 이해를 돕기 위한 좀더 복잡한 예제를 가정해보자.

```js
function complexityTask() {
  const a = 3;
  const b = makeB();
  const c = makeC();
  const sumResult = sum(a, b, c);
}
```

`sum` 함수에 `b` 와 맞먹는 복잡한 `c` 가 껴들어왔다.

Promise 로 자연스럽게

```js
function complexityTask() {}
```

위에서 언급했던 링크중 event loop 의 도식을 자세히 보면 자바스크립트의 이벤트 루프 동작원리 볼 수 있는데, 거기에서 우리는
자바스크립트의 비동기 동작을 어떻게 처리하는 지 알수 있다.

보통 Async/Await 의 예제를 살펴보면 fetch, timeout 등을 이용해서 설명하게 된다.)

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function

컴퓨터 과학에서는 이를 미래(future), 약속(promise), 지연(delay) 이라는 몇 가지 세부적인 패턴으로 나뉘고 이는 일부 동시 프로그래밍에서 프로그램의 실행을 동기하는데 사용되는 디자인 패턴이라고 한다.

(아니 그동한 구축해 놓은 imperative 시절의 명령 체계들은 재사용하고 비동기 환경에서의 )

### 일상에서의 지연과 딜레이

일상에서도 우리는 일의 지연과 딜레이 그리고 약속을 통해 어떤 일련의 일을 완료하게 된다.

직장인에게 출근은 동기적으로 처리되는 숙명과도 같다. 그렇게 출근하고 여러가지 업무들이 나에게 인풋으로 들어오고
그 인풋중에 몇가지는 뒤로 미루고 몇가지는 직접 처리하게 된다.

나같은 개발자는 중간에 커피타임이라는 숙명의 동기처리가 필요하다.

### 함수형과 재사용

그리고 연결성이 존재하는 연산

## References

- https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
