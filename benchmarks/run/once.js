'use strict';

const benchmark = require('benchmark');

const EventEmitter2 = require('eventemitter2').EventEmitter2
    , EventEmitter1 = require('events').EventEmitter
    , Emitix = require('emitix').default
    , EventEmitter3 = require('eventemitter3')
    , Drip = require('drip').EventEmitter
    , CE = require('contra/emitter')
    , EE = require('event-emitter')
    , FE = require('fastemitter');

function handle() {
  if (arguments.length > 100) console.log('damn');
}

const ee1 = new EventEmitter1()
    , ee2 = new EventEmitter2()
    , ee3 = new EventEmitter3()
    , drip = new Drip()
    , fe = new FE()
    , ce = CE()
    , ee = EE()
    , eix = new Emitix();

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.once('foo', handle).emit('foo');
}).add('EventEmitter2', function() {
  ee2.once('foo', handle).emit('foo');
}).add('EventEmitter3', function() {
  ee3.once('foo', handle).emit('foo');
}).add('Drip', function() {
  drip.once('foo', handle).emit('foo');
}).add('fastemitter', function() {
  fe.once('foo', handle).emit('foo');
}).add('event-emitter', function() {
  ee.once('foo', handle).emit('foo');
}).add('contra/emitter', function() {
  ce.once('foo', handle).emit('foo');
}).add('emitix', function() {
  eix.once('foo', handle); eix.emit('foo');
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
