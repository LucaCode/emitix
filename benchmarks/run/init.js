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

let emitter;

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  emitter = new EventEmitter1();
}).add('EventEmitter2', function() {
  emitter = new EventEmitter2();
}).add('EventEmitter3', function() {
  emitter = new EventEmitter3();
}).add('Drip', function() {
  emitter = new Drip();
}).add('fastemitter', function() {
  emitter = new FE();
}).add('event-emitter', function() {
  emitter = EE();
}).add('contra/emitter', function() {
  emitter = CE();
}).add('emitix', function() {
  emitter = new Emitix();
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
