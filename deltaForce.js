var EventEmitter = require('events');
var util = require('util');

module.exports = Timer;

  function Timer () {

    EventEmitter.call(this);
    var self = this;
    var i = 0;
    setInterval (function () {
      self.emit('tick', { interval : i++});
    }, 1000);
  }
  //need to extend before creating a new instance
  util.inherits(Timer, EventEmitter);

  var myTimer = new Timer();

  function tickHandler(event) {
    // \n means new line
    process.stdout.write('tick ' + event.interval + '\n');
  }

  //what it's listening for and what event
  myTimer.addListener('tick', tickHandler);