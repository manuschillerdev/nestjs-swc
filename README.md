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

### production build

```bash
❯ time "dum build:nest-cli" "dum build:swc"
Benchmark #1: dum build:nest-cli
  Time (mean ± σ):      2.988 s ±  0.128 s    [User: 4.386 s, System: 0.365 s]
  Range (min … max):    2.904 s …  3.329 s    10 runs

Benchmark #2: dum build:swc
  Time (mean ± σ):     163.5 ms ±   7.3 ms    [User: 112.7 ms, System: 47.4 ms]
  Range (min … max):   156.9 ms … 186.8 ms    18 runs

Summary
  'dum build:swc' ran
   18.27 ± 1.13 times faster than 'dum build:nest-cli'
```

### jest

```bash
❯ time "dum test:ts-jest" "dum test:swc"
Benchmark #1: dum test:ts-jest
  Time (mean ± σ):      2.809 s ±  0.114 s    [User: 4.445 s, System: 0.489 s]
  Range (min … max):    2.723 s …  3.076 s    10 runs

Benchmark #2: dum test:swc
  Time (mean ± σ):      1.083 s ±  0.011 s    [User: 985.3 ms, System: 262.2 ms]
  Range (min … max):    1.072 s …  1.112 s    10 runs

Summary
  'dum test:swc' ran
    2.59 ± 0.11 times faster than 'dum test:ts-jest'
```

## Caveats

- Sometimes, TypeORM does not close the connection properly. In this case, the server needs to be restarted manually
- HMR is 100% experimental. Open to any ideas on how this could be implemented better.
