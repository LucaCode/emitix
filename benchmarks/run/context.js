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

const ctx = { foo: 'bar' };

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

ee3.on('foo', handle, ctx);
ee2.on('foo', handle.bind(ctx));
ee1.on('foo', handle.bind(ctx));
drip.on('foo', handle.bind(ctx));
ee.on('foo', handle.bind(ctx));
fe.on('foo', handle.bind(ctx));
ce.on('foo', handle.bind(ctx));
eix.on('foo',handle.bind(ctx));

(
  new benchmark.Suite()
).add('EventEmitter1', function() {
  ee1.emit('foo');
  ee1.emit('foo', 'bar');
  ee1.emit('foo', 'bar', 'baz');
  ee1.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter2', function() {
  ee2.emit('foo');
  ee2.emit('foo', 'bar');
  ee2.emit('foo', 'bar', 'baz');
  ee2.emit('foo', 'bar', 'baz', 'boom');
}).add('EventEmitter3', function() {
  ee3.emit('foo');
  ee3.emit('foo', 'bar');
  ee3.emit('foo', 'bar', 'baz');
  ee3.emit('foo', 'bar', 'baz', 'boom');
}).add('Drip', function() {
  drip.emit('foo');
  drip.emit('foo', 'bar');
  drip.emit('foo', 'bar', 'baz');
  drip.emit('foo', 'bar', 'baz', 'boom');
}).add('fastemitter', function() {
  fe.emit('foo');
  fe.emit('foo', 'bar');
  fe.emit('foo', 'bar', 'baz');
  fe.emit('foo', 'bar', 'baz', 'boom');
}).add('event-emitter', function() {
  ee.emit('foo');
  ee.emit('foo', 'bar');
  ee.emit('foo', 'bar', 'baz');
  ee.emit('foo', 'bar', 'baz', 'boom');
}).add('contra/emitter', function() {
  ce.emit('foo');
  ce.emit('foo', 'bar');
  ce.emit('foo', 'bar', 'baz');
  ce.emit('foo', 'bar', 'baz', 'boom');
}).add('emitix', function() {
  eix.emit('foo');
  eix.emit('foo', 'bar');
  eix.emit('foo', 'bar', 'baz');
  eix.emit('foo', 'bar', 'baz', 'boom');
}).on('cycle', function cycle(e) {
  console.log(e.target.toString());
}).on('complete', function completed() {
  console.log('Fastest is %s', this.filter('fastest').map('name'));
}).run({ async: true });
