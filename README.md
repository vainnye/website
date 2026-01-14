# Personal Developer Website

This is my personal developer website, where I showcase my projects and provide information about myself.

## Dev & build

```sh
# dev
pnpm dev # localhost
pnpm dev --host # 0.0.0.0

# prod
pnpm build && vite dist
pnpm preview # production preview on localhost
pnpm preview --host # production preview on 0.0.0.0
```

## TODO

- [ ] enhace website look
- [ ] seo friendliness
  - [ ] language as a url path
  - [ ] prebuild website / stop using react
  - [ ] project desc i18n
- [ ] content
  - [ ] project images
  - [ ] project pages
  - [ ] project demo
- [ ] refactor
 - [ ] better content / code separation
  - [ ] keep content out of code
  - [ ] separate french and english content in 2 files 
  - [ ] merge default content (currently in code) with the english content + add default mechanism to i18n implementation
