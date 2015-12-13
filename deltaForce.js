var EventEmitter = require('events');
var util = require('util');

module.exports = Timer;

function Timer () {
  //
  EventEmitter.call(this);
  //self happens before this, and is the previous-case
  //self is what goes through setInterval
  //'this' is the instance of, the current and now new value
  var self = this;
  var counter = 0;

  this.start = function () {
    //returning time in MilliSeconds (google more on)
    var time = Date.now();

    self.emit('start', { startTime : time});
    setInterval (function () {
      //++ before increments before passing along, since starting at 0
      self.emit('tick', { interval : ++counter});
    }, 1000);

    if (this.count > 5){

    }

    };

  //   this.stop = function() {
  //   var time = Date.now();

  //   self.emit('stop', { stopTime : time});
  //   setInterval (function () {
  //     self.emit()
  //   })
  // };
}
//need to extend before creating a new instance
util.inherits(Timer, EventEmitter);

var myTimer = new Timer();

function startHandler (event) {
  process.stdout.write('startTime : ' + event.startTime + '\n');
}
function tickHandler(event) {
  // \n means new line
  process.stdout.write('tick : ' + event.interval + '\n');
}

//what it's listening for and what event
myTimer.addListener('start', startHandler);
myTimer.addListener('tick', tickHandler);
myTimer.start();