# Deno

## Module

### https://module.land/

- 모듈 레지스트리로 npmjs.org 와 같은 서비스

#### install

- land 라는 서비스를 deno 를 이용해 cli 에 등록

```bash
deno install -Af https://module.land/cli/land.js
```

- 설치확인

```bash
land -v
```

#### usage

프로젝트 스페이스에서 module 추가

```bash
land add moduleland/deno-lib@1.0.0
```

main.ts

```bash
import { foo, fighter } from 'moduleland/deno-lib@1.0.0/main.ts'

console.log(foo(), fighter(2))
```

위와 같이 사용할 수 있게 됨
