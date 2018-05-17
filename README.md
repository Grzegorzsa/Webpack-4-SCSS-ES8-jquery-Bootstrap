# Webpack 4 SCSS-ES8-jQuery-Bootstrap starter
- Frontend starter: HTML + SCSS + ES8 + jQyery + Bootstrap 4
- Image optimization
- Quality tools: ESLing + stylelint config files

## Installation
```
npm install
```
## Usage
`npm run dev` - development build<br>
`npm run build` - production build

## Extras
Since Babel only transforms syntax (like arrow functions), you can use babel-polyfill in order to support new globals such as Promise or new native methods like String.padStart (left-pad).

`npm i --save-dev babel-polyfill` - install Polyfill package

updated entry in webpack.config.js:<br>
```
  app: [
    'babel-polyfill',
    './src/js/app.js',
    './src/scss/main.scss',
  ],
```
