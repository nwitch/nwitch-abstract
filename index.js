var behest = require('behest');
var DDG = require('node-ddg-api').DDG;

function abstract() {
  return function(irc) {
    irc.on('message', function(evt) {
      var from = evt.from;
      var to = evt.to;
      var message = evt.message;

      if (!behest.isValid(message)) {
        return;
      }

      var command = behest(message);

      if (command.command === 'abstract') {
        var destination = to.charAt(0) === '#' ? to : from;
        var str = command.params.slice(0).join(' ');

        var ddg = new DDG('nwitch');

        ddg.instantAnswer(str, {}, function(error, response) {
          if (error) {
            irc.send(destination, from + ': Error looking up abstract.');
            return;
          }

          var topic;
          if (response.RelatedTopics && response.RelatedTopics.length) {
            topic = response.RelatedTopics[0];
          }

          if (response.AbstractText) {
            irc.send(destination, from + ': ' + response.AbstractText);
            if (response.AbstractURL) {
              irc.send(destination, from + ': ' + response.AbstractURL);
              return;
            }
          }
          else if (topic && !/\/c\//.test(topic.FirstURL)) {
            irc.send(destination, from + ': ' + topic.Text);
            irc.send(destination, from + ': ' + topic.FirstURL);
            return;
          }
          else if (response.Definition) {
            irc.send(destination, from + ': ' + response.Definition);
            if (response.DefinitionURL) {
              irc.send(destination, from + ': ' + response.DefinitionURL);
              return;
            }
          }
          else {
            irc.send(destination, from + ': I don\'t know anything about that.');
          }
        });
      }
    });
  };
}

module.exports = abstract;