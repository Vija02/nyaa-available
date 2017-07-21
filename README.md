# nyaa-available [![npm version](https://badge.fury.io/js/nyaa-available.svg)](https://badge.fury.io/js/nyaa-available) [![Build Status](https://travis-ci.org/Vija02/nyaa-available.svg?branch=master)](https://travis-ci.org/Vija02/nyaa-available)
Check nyaa.si to see if an episode if available

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

Modify the title and return a name more suitable to search in nyaa.si

## FAQ

### Why are there occasional errors when calling the method many times?

Make sure that you query the site at an acceptable pace. For example, 1 request/second.

## Help

If there is any problem with the package, please create an issue on github. Thanks!
