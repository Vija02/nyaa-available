# nyaa-available
Check nyaa.se to see if an episode if available

## Install

```
$ npm install --save nyaa-available
```

## Usage

```js
const nyaa = require('nyaa-available');

nyaa.checkEpisode().then((res) => {
  console.log(res);
  // True or false
});
```

## Help
If there is any problem with the package, please create an issue. Thanks!
