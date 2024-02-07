# vue-counter-app

- one pager counter with lightmode and darkmode
- only real setting available is under <code>app.js</code>'s data method returned object of the Vue component, where you can set <code>numberOfCountersWanted</code> to any number (setting less than on running before discards the data of the counters > new number)
- localStorage key <code>counterData</code> is used for storage

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
