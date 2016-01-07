var EventEmitter = require('events');
var util = require('util');

module.exports = Timer;

function Timer (max, maxOff) {
  //comes with a lot of properties that can be inherited
  //allows us to use/create self.emit
  EventEmitter.call(this);
  //self happens before this, and is the previous-case
  //self is what goes through setInterval
  //'this' is the instance of, the current and now new value
  var self = this;
  var counter = 0;
  var timerStarter;
  var maxy = 5 || max;
  var maxDevy = 50 || maxOff;
  var stopTime;
  var startTime;
  var totalTime;
  var lagTime;


  this.start = function () {
    startTime = Date.now();
    //returning time in MilliSeconds (google more on)

    self.emit('start', { startTime : startTime});
    timerStarter = setInterval (function () {
      //++ before increments before passing along, since starting at 0
      self.emit('tick', { interval : ++counter});
      if (counter > maxy) {
        //use 'self' over 'this' bc self is inside of 'this'; to access Timer
        self.stop();
        // self.complete();
      }
    }, 1000);
  };
  this.stop = function() {
    stopTime = Date.now();
    // totalTime = Date.now();
    var lagDiff = counter * 1000;


    self.emit('stop', { stopTime : stopTime});
    //check with Tony if moving totalTime into stopTime was a good solution?
    //probably not since self.complete() won't be used?
    totalTime = stopTime - startTime;
    lagTime = totalTime - lagDiff;
    self.emit('complete', {totalTime : totalTime});
    if (lagTime > 20 && lagTime < 30){
    self.emit('lag', {lagTime : lagTime});
    }
    if (lagTime > 30){
      return 950;
    }
    //clears, stops
    clearInterval(timerStarter);
  };
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
function stopHandler (event) {
  process.stdout.write('stopTime : ' + event.stopTime + '\n');
}
function totalHandler (event) {
  process.stdout.write('totalTime : ' + event.totalTime + '\n');
}
function lagHandler (event){
  process.stdout.write('lagTime : ' + event.lagTime + '\n');
}

//what it's listening for and what event
myTimer.addListener('start', startHandler);
myTimer.addListener('tick', tickHandler);
myTimer.addListener('complete', totalHandler);
myTimer.addListener('lag', lagHandler);
myTimer.addListener('stop', stopHandler);
//only need to exclusively call start
myTimer.start();
