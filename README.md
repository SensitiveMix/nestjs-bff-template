# Nestjs BFF README

This README is for Nestjs BFF Module Architecture, Node.js Code Style Guide and Git Flow.

You can add the rules you think we need to follow.
## Contents
- [Installation & Usage](#installation--usage)
- [Project Structure](#project-structure)
- [Node.js Style Guide](#nodejs-style-guide)
  - [Syntax](#syntax)
  - [Indentation](#indentation)
  - [Naming Convention](#naming-convention)
  - [Code Style Format](#code-style-format)
- [Git Flow](#git-flow)
  - [Branch Naming convention](#branch-naming-convention)
  - [Dev Flow](#dev-flow)
  - [Commit Message](#commit-message)
- [Test](#test)
- [Link](#link)

## Installation & Usage
1. This installation steps based on Windows 10. If you want to install this project on Linux or MacOS, you may need to choose a different platform version of Node.js. Maybe you need to change some configurations, maybe not.

1. You need install nvm from here, and then install node v14.15.4 by nvm (nvm install 14.15.4 & nvm use 14.15.4).
1. And then, you need clone the repo. Run `git@github.com:SensitiveMix/nestjs-bff-template.gitt` in work folder.
1. cd to nestjs-bff-template folder. Run `npm install` in this path.
1. After install success, Run `npm run start:dev`.


## Project Structure

```text
.
├── README.md                                           // Introduce
├── commitlint.config.js                                // Lint-staged Configuration
├── nest-cli.json                                       // Nestjs Configuration
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts                                   // Global APP Module
│   ├── common                                          // Global Nest Module
│   │   ├── decorators                                  // Nest Decorators
│   │   │   ├── login-info.decorator.ts                 // LoginInfo Decorators
│   │   │   └── roles.decorator.ts                      // Roles Decorators
│   │   ├── exception                                   
│   │   │   ├── bad-request.exception.ts                // Override BadRequestException
│   │   │   ├── not-found.exception.ts                  // Override NotFoundException
│   │   │   ├── throttling.exception.ts                 // Override ThrottlingException
│   │   │   └── unauthorized.exception.ts               // Override UnauthorizedException
│   │   ├── filters                                     
│   │   │   ├── any-exception.filter.spec.ts            // AnyException Test Suite   
│   │   │   └── any-exception.filter.ts                 // AnyException Filter(Include HTTPException Filter)
│   │   ├── guards
│   │   │   └── auth.guard.ts                           // Auth Guard
│   │   ├── middleware
│   │   │   ├── api-logger.middleware.ts                // API Response Time Logger Middleware
│   │   │   ├── compression.middleware.ts               // Body Compression Middleware
│   │   │   ├── cookie-parser.middleware.ts             // Cookie Parser Middleware
│   │   │   ├── cors.middleware.ts                      // Request CORS Middleware
│   │   │   ├── helmet.middleware.ts                    // Helmet (CSP/HSTS/RENDERRER_POLICY) Middleware
│   │   │   ├── json-body.middleware.ts                 // Parse Body To Json Middleware
│   │   │   └── rate-limit.middleware.ts                // Request Rate Limit Middleware
│   │   ├── pipes
│   │   │   ├── parse-int.pipe.ts                       // Parse Param To INT Pipe
│   │   │   └── validation.pipe.ts                      // AJV Validation Pipe
│   │   ├── common.module.ts
│   │   └── prividers
│   │       ├── logger.service.ts                       // Global Logger Service
│   │       ├── request-context.service.ts              // Request Content Service
│   │       └── util.service.ts                         // Global Util Service
│   ├── config
│   │   ├── cfg.default.ts                              // Default Config Map
│   │   ├── cfg.development.ts                          // Dev Config Map
│   │   ├── cfg.production.ts                           // Prod Config Map
│   │   ├── cfg.test.ts                                 // Test Config Map
│   │   └── index.ts                                    // Config Merger Center
│   ├── constants
│   │   └── error.ts                                    // HTTP Error Constants
│   ├── main.ts                                         // Global APP Main
│   └── modules
│       └── user                                        // User Module
│           ├── user.controller.ts                      // User Controller
│           ├── user.module.ts                          // User Module
│           ├── user.service.spec.ts                    // User Service Test Suite
│           └── user.service.ts                         // User Service
├── test
│   ├── app.e2e-spec.ts                                 // Global APP E2E Test Suites
│   └── jest-e2e.json                                   // E2E Test Configuration
├── tsconfig.build.json                                 // Prod Env TS Configuration
└── tsconfig.json                                       // Dev Env TS Configuration
```




## Node.js Style Guide
We use Node.js[(LTS 14.15.4)](https://github.com/nodejs/node/tree/v14.15.4) at nestjs-bff-template service.

### Syntax
1. Always use `const` or `let` to declare variables, preventing them from becoming global variables.
1. Always use `semicolons`. (Do not miss semicolons when you want to end every pieces of code)

### Indentation
Use two spaces to indent instead of tab when you write JavaScript code. If you want to use tab to indent, you can set soft tab at your editor.


### Naming Convention

1. For the variables, use little camel-case naming, e.g. `response`, `queryBody`, `isKeywordField`
1. If you want to declare constant value, use uppercase with underscore, e.g. `NAME_LIKE_THIS`, `TEXT_BUT_KEYOWRD_FIELDS`
1. For the function and method naming, use little camel-case naming beginning with a verb, e.g. `getPolicies`, `addPolicy`, `searchLog`
1. For the Class name, use big camel-case, e.g. `LoggerService`, `ApiMiddleware`, `AppModule`
1. For the file name, use lowercase with underscore, e.g. `bad-request.exception.ts`, `parse-int.pipe.ts`


### Code Style Format

1. Lint code  `npm run lint`
1. Format code  `npm run format`



## Git Flow
### Branch Naming convention

- dev
- int
- prod
- feature/XXX
- bugfix/XXX
- hotfix/XXX
- chore/XXX 
- backup/branch_name_time
- username/feature/XXX

For example:

- feature/user
- hotfix/user

### Commit Message
```txt
<type>[optional scope]: <description>
```

type：

- build
- ci
- docs
- feat
- fix
- perf
- refactor
- style
- test
- revert
- chore

For example:

- style(dashboard): Add semicolon
- fix(dashboard): Fix user section
- feat(dashboard): Support new section



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Links
- [Nest Prisma Starter](https://github.com/CatsMiaow/nestjs-prisma-starter)
- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)

[Back to top](#nestjs-bff-readme)
