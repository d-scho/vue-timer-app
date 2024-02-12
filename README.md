# Vue timer app

-   themed timer app with notes panel
-   localStorage keys `vue-timer-app_theme`, `vue-timer-app_notes`, `vue-timer-app_timers` are used to store data
-   the builds are checked in aswell if you just want to use those, there is a
    -   "normal" production build inside `dist` and a
    -   minified singlefile build to use locally without server inside `dist-singlefile`

## Project setup

```sh
bun install
```

## Compile and hot-reload for development

```sh
bun run dev
```

## Building

### Type-check, compile and minify for production

```sh
bun run build:production
```

### Type-check, compile and minify as singlefile to run serverless

```sh
bun run build:singlefile
```

### Run both build commands

```sh
bun run build
```
