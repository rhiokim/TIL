# Tips

## Using named condition

JSX 구문내에 Condition 체크 로직은 Function Component Body 에서
계산하고 의미적인 네이밍을 선언적인 JSX 구문에서 사용하므로써
Human Readability 가 좋아진다.

😖

```tsx
function Component({ list }: Props) {
  return (
    <>
      <ul>{list.length > 0 ? list.map((item) => <li>{item}</li>) : null}</ul>
    </>
  );
}
```

🥰

```tsx
function Component({ list }: Props) {
  const hasItems = list && list.length > 0;

  return (
    <>
      <ul>{hasItems ? list.map((item) => <li>{item}</li>) : null}</ul>
    </>
  );
}
```
