var nwitchAbstract = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var Stream = require('readable-stream').PassThrough;
var irc = require('slate-irc');

test('exports a function which returns a function when called', function(t) {
  t.plan(2);
  t.ok(isFunction(nwitchAbstract));
  t.ok(isFunction(nwitchAbstract()));
});

test('gets abstract on given topic', function(t) {
  t.plan(3);
  var stream = new Stream();
  var client = irc(stream);
  client.use(nwitchAbstract());

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, ':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :!abstract numerology\r\n');
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: Numerology is any belief in ' +
                       'divine, mystical or other special relationship ' +
                       'between a number and some coinciding events. It has ' +
                       'many systems and traditions and beliefs. Numerology ' +
                       'and numerological divination by systems such as ' +
                       'isopsephy were popular among early mathematicians, ' +
                       'but are no longer considered part of mathematics and ' +
                       'are regarded as pseudomathematics or pseudoscience ' +
                       'by modern scientists.\r\n');
        break;
      case 2:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: https://en.wikipedia.org/wiki/Numerology\r\n');
        break;
    }
  });

  stream.write(':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :!abstract numerology\r\n');
});

test('gets abstract on related topic', function(t) {
  t.plan(3);
  var stream = new Stream();
  var client = irc(stream);
  client.use(nwitchAbstract());

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, ':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :!abstract astronomy\r\n');
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: Astronomy A natural science that ' +
                       'is the study of celestial objects, the physics, ' +
                       'chemistry, and...\r\n');
        break;
      case 2:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: https://duckduckgo.com/Astronomy\r\n');
        break;
    }
  });

  stream.write(':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :!abstract astronomy\r\n');
});