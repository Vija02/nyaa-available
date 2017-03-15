# nyaa-available
Check nyaa.se to see if an episode if available

## Install

```
$ npm install --save nyaa-available
```

## Usage

```js
const nyaa = require('nyaa-available');

nyaa.checkEpisode("Clannad", 23).then((res) => {
  console.log(res); // true
});

nyaa.checkEpisode("Clannad", 24).then((res) => {
  console.log(res); // false
});
```

## API

### `.checkEpisode(string title, int episode): Promise(bool)`

Checks the if the episode given exists. Returns a promise.

### `.modifyTitle(string title): string`

Modify the title and return a name more suitable to search in nyaa.se

## Help
If there is any problem with the package, please create an issue. Thanks!
