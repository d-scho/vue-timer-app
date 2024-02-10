# Vue timer app

- timer app with lightmode and darkmode
- localStorage keys `vue-timer-app_isDarkmodeEnabled`, `vue-timer-app_notes`, `vue-timer-app_timers` are used to store data
- the builds are checked in aswell if you just want to use those, there is a
	- "normal" production build inside `dist` and a
	- minified singlefile build to use locally without server inside `dist-singlefile`

## Project setup
```sh
bun install
```

## Compile and hot-reload for development
```sh
bun run dev
```

## Type-check, compile and minify for production
```sh
bun run build
```

## Type-check, compile and minify for production as singlefile to run serverless
```sh
bun run build:singlefile
```