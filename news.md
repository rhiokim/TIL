# News

## 20200518-0525
- Passwordless Authentication with Magic Links
  - https://auth0.com/docs/connections/passwordless/guides/email-magic-link
  > ![Magic link transaction](https://cdn2.auth0.com/docs/media/articles/connections/passwordless/passwordless-email-magic-link-start-flow.png)
- Rust
  - [ ] https://jesselawson.org/rust/getting-started-with-rust-by-building-a-tiny-markdown-compiler/
  > 작은 사이즈의 마크다운 컴파일러를 작성하면서 배우는 rust
  - [ ] https://qiita.com/garkimasera/items/edce62f3fd6b2fe98d82
  > Rust 5년을 돌아보며, 왜 rust 를 배워야 할까?
- 함께하라, 연대하라
  - 함께해서 행복한 것들을 찾아봐라.
- Deno
  - [ ] https://github.com/denoland/deno/issues/5432
  > 컴파일 속도 향상
  - [ ] https://github.com/denoland/deno/issues/986
  > 바이너리 컴파일 관련

### Docker
- Support Multi CPU Architecture https://docs.docker.com/docker-for-mac/multi-arch/
> 공개된 이미지가 Multi CPU Architecture 를 지원하는 경우 Docker Hub 에서 image pull 할 때 architecture 를 명시하지 않아
> 자동으로 적절한 이미지 다운로드
> - experimental **buildx** 명령어를 사용하면 Multi CPU Architecture 에 대응하는 이미지들을 빌드


## 20200504-0510

- ReasonML
  - https://reasonml.org/blog/state-of-reasonml-org-2020-q2-pt1
    >
- vuejs/Vite
  - https://github.com/vuejs/vite
- esbuild
  - https://github.com/evanw/esbuild
  - 속도 정말 빠름, 너무 빠름, babel 은 지원 계획없음
  - React.FC 만 babel build 할 수 있기를 기대헀으나
- ultra-runner
  - https://github.com/folke/ultra-runner
  - monorepo 를 자동으로 인식해 npm-scripts 를 concurrency 빌드를 수행
  - scripts 수행 후 checksum 을 이용해 변경사항에 대해서만 빌드를 실행해 속도 향상
  - monorepo 에서 script 수행 시 유용한 옵션들도 함께 제공
