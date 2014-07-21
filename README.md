# nwitch-abstract

[![Build Status](https://travis-ci.org/nwitch/nwitch-abstract.svg)](https://travis-ci.org/nwitch/nwitch-abstract)
[![Dependency Status](https://gemnasium.com/nwitch/nwitch-abstract.svg)](https://gemnasium.com/nwitch/nwitch-abstract)

[nwitch][] (and [slate-irc][]) plugin for getting a nice abstract on any topic.

``` irc
05:34 <KenanY> !abstract astronomy
05:34 <nwitch> KenanY: Astronomy A natural science that is the study of
               celestial objects, the physics, chemistry, and...
```
## Example

As a [nwitch][] plugin (using `config.toml`):

``` toml
[plugins]
nwitch-abstract = true
```

Or through [nwitch][]'s API:

``` javascript
var Nwitch = require('nwitch');
var nwitchAbstract = require('nwitch-abstract');

var nwitch = new Nwitch({
  irc: {
    address: 'irc.freenode.org',
    port: 6667
  }
});

nwitch.use(nwitchAbstract());
```

Technically, all [nwitch][] plugins are just [slate-irc][] plugins, so you could
also use this as a [slate-irc][] plugin:

``` javascript
var net = require('net');
var irc = require('slate-irc');
var nwitchAbstract = require('nwitch-abstract');

var stream = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
});

var client = irc(stream);
client.use(nwitchAbstract());
```

## Installation

``` bash
$ npm install nwitch-abstract
```

## API

``` javascript
var nwitchAbstract = require('nwitch-abstract');
```

### `nwitchAbstract()`

Returns a function that accepts an instance of [slate-irc][].


  [nwitch]: https://github.com/KenanY/nwitch
  [slate-irc]: https://github.com/slate/slate-irc