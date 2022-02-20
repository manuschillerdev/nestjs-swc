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

#### unit tests

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

#### unit tests with coverage

```bash
❯ time "dum test:cov:ts-jest" "dum test:cov:swc"
Benchmark #1: dum test:cov:ts-jest
  Time (mean ± σ):     10.206 s ±  0.583 s    [User: 50.058 s, System: 4.228 s]
  Range (min … max):    9.651 s … 11.351 s    10 runs

Benchmark #2: dum test:cov:swc
  Time (mean ± σ):      2.044 s ±  0.170 s    [User: 5.328 s, System: 1.151 s]
  Range (min … max):    1.881 s …  2.302 s    10 runs

Summary
  'dum test:cov:swc' ran
    4.99 ± 0.50 times faster than 'dum test:cov:ts-jest'
```

#### e2e tests

```bash
Benchmark #1: dum test:e2e:ts-jest
  Time (mean ± σ):      3.817 s ±  0.190 s    [User: 5.280 s, System: 0.710 s]
  Range (min … max):    3.659 s …  4.204 s    10 runs

Benchmark #2: dum test:e2e:swc
  Time (mean ± σ):      2.138 s ±  0.114 s    [User: 1.934 s, System: 0.477 s]
  Range (min … max):    2.052 s …  2.436 s    10 runs

Summary
  'dum test:e2e:swc' ran
    1.79 ± 0.13 times faster than 'dum test:e2e:ts-jest'
```

## Caveats

- Sometimes, TypeORM does not close the connection properly. In this case, the server needs to be restarted manually
- HMR is 100% experimental. Open to any ideas on how this could be implemented better.
