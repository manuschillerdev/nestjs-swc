# Using NestJS with SWC

This experimental project aims to explore the possibilities of using `swc` with `NestJS`.
Tries to mimic a non-trivial project with `TypeORM`, `nestjsx/crud`, and dynamically loaded entities.

foo

## Features

- dev-server with
  - experimental "hot-reloading"
  - transpiled by `swc` instead of `ts-loader`
  - does not write transpiled files to disk (no `dist` folder in dev)
  - supports source-maps (correct mappings of line numbers in errors to Typescript source files)
- alternative webpack setup (disclaimer: totally not happy with this)
  - uses `swc-loader` instead of `ts-loader`
  - removes `ForkTsCheckerWebpackPlugin`
  - uses a HMR config based on the docs
  - ⚠️ does not seem reliable (code changes are sometimes not reflected in responses). Unclear if `swc-loader` might cause or if the setup is wrong.
  - ⚠️ does not have proper source-map support
  - ⚠️ does not support generic glob references to entities
- testing (`jest`)
  - uses `@swc/jest` for transforms
  - supports coverage reports
  - supports watch mode
  - supports e2e-test. ⚠️ needed to change `import * as request from "supertest";` to `import request from "supertest";` to make it work

## Benchmarks

### jest

```bash
❯ hyperfine "npm run test" # with ts-jest
Benchmark #1: npm run test
  Time (mean ± σ):      3.436 s ±  0.349 s    [User: 4.680 s, System: 0.543 s]
  Range (min … max):    3.156 s …  4.211 s    10 runs

❯ hyperfine "npm run test" # with @swc/jest
Benchmark #1: npm run test
  Time (mean ± σ):      1.447 s ±  0.020 s    [User: 1.268 s, System: 0.323 s]
  Range (min … max):    1.428 s …  1.500 s
```

## Caveats

- Sometimes, TypeORM does not close the connection properly. In this case, the server needs to be restarted manually
- HMR is 100% experimental. Open to any ideas on how this could be implemented better.
