# vue-timer-app

- timer app with lightmode and darkmode
- only real setting available is under <code>app.js</code>'s data method returned object of the Vue component, where you can set <code>numberOfTimersWanted</code> to any number (setting less than on running before discards the data of the timers > new number)
- localStorage keys `vue-timer-app_isDarkmodeEnabled`, `vue-timer-app_textareaContent`, `vue-timer-app_storedTimers` are used to store data

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun run dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```
