# title

```tsx
enum PaymentType {
  ORDER = "ORDER"
  CANCEL = "ORDER_CANCEL"
}

type Payment {
  type: PaymentType
  amount: 1000
}

function Item(data: Payment) {
  return (
    <div>
      <span>amount</span>
    </div>
  )
}
```

위와 같은 코드가 있고 `Payment.type` 값에 따라 `amount` 의 `color` 스타일이 변경되어야 한다고 가정해보자.

## Props

색상이 바껴야 하는 target 컴포넌트에 prop을 추가한다.

## Wrapper

Wrapper div 에 cancel 상태를 만든다.

## SoC

상태값에 따라 랜더링하는 별도의 컴포넌트로 분리한다.
