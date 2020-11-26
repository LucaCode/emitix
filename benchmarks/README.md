# These benchmarks are an adjusted copy from the eventemitter3 benchmarks.

Starting benchmark init.js

```
EventEmitter1 x 28,399,532 ops/sec ±1.03% (88 runs sampled)
EventEmitter2 x 35,298,673 ops/sec ±0.61% (87 runs sampled)
EventEmitter3 x 68,071,800 ops/sec ±0.65% (88 runs sampled)
Drip x 67,914,311 ops/sec ±0.55% (91 runs sampled)
fastemitter x 20,360,644 ops/sec ±0.74% (86 runs sampled)
event-emitter x 45,347,239 ops/sec ±0.60% (89 runs sampled)
contra/emitter x 13,490,550 ops/sec ±0.92% (92 runs sampled)
emitix x 50,593,904 ops/sec ±0.54% (91 runs sampled)
Fastest is [ 'EventEmitter3', 'Drip' ]
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 8,387,936 ops/sec ±0.62% (89 runs sampled)
EventEmitter2 x 7,929,668 ops/sec ±0.63% (89 runs sampled)
EventEmitter3 x 9,501,152 ops/sec ±0.48% (92 runs sampled)
Drip x 8,251,538 ops/sec ±0.61% (91 runs sampled)
event-emitter x 5,230,602 ops/sec ±0.67% (88 runs sampled)
contra/emitter x 997,787 ops/sec ±0.56% (90 runs sampled)
emitix x 15,732,711 ops/sec ±0.52% (91 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 2,500,069 ops/sec ±1.07% (89 runs sampled)
EventEmitter2 x 2,849,296 ops/sec ±0.85% (87 runs sampled)
EventEmitter3 x 3,735,516 ops/sec ±0.68% (91 runs sampled)
fastemitter x 3,608,017 ops/sec ±0.60% (89 runs sampled)
event-emitter x 1,926,324 ops/sec ±0.65% (90 runs sampled)
contra/emitter x 828,914 ops/sec ±0.61% (91 runs sampled)
emitix x 4,653,967 ops/sec ±0.62% (92 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark context.js

```
EventEmitter1 x 7,937,053 ops/sec ±0.63% (88 runs sampled)
EventEmitter2 x 7,549,813 ops/sec ±0.63% (91 runs sampled)
EventEmitter3 x 9,525,276 ops/sec ±0.74% (91 runs sampled)
Drip x 7,847,957 ops/sec ±0.67% (88 runs sampled)
fastemitter x 6,565,807 ops/sec ±0.59% (90 runs sampled)
event-emitter x 5,076,858 ops/sec ±0.72% (90 runs sampled)
contra/emitter x 980,651 ops/sec ±0.54% (91 runs sampled)
emitix x 15,658,688 ops/sec ±0.74% (91 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark once.js

```
EventEmitter1 x 7,139,907 ops/sec ±0.66% (92 runs sampled)
EventEmitter2 x 4,627,641 ops/sec ±0.65% (85 runs sampled)
EventEmitter3 x 8,631,784 ops/sec ±0.59% (82 runs sampled)
Drip x 15,055,460 ops/sec ±0.63% (82 runs sampled)
fastemitter x 9,381,666 ops/sec ±0.61% (91 runs sampled)
event-emitter x 3,967,238 ops/sec ±0.60% (91 runs sampled)
contra/emitter x 3,618,780 ops/sec ±1.43% (90 runs sampled)
emitix x 23,373,390 ops/sec ±1.68% (81 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark hundreds.js

```
EventEmitter1 x 390,573 ops/sec ±0.94% (86 runs sampled)
EventEmitter2 x 341,800 ops/sec ±0.61% (90 runs sampled)
EventEmitter3 x 424,896 ops/sec ±0.76% (91 runs sampled)
Drip x 487,451 ops/sec ±3.07% (87 runs sampled)
fastemitter x 442,144 ops/sec ±0.61% (90 runs sampled)
event-emitter x 345,261 ops/sec ±0.61% (93 runs sampled)
contra/emitter x 235,097 ops/sec ±0.55% (91 runs sampled)
emitix x 720,964 ops/sec ±0.55% (92 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark emit.js

```
EventEmitter1 x 8,318,615 ops/sec ±0.99% (89 runs sampled)
EventEmitter2 x 7,978,599 ops/sec ±0.57% (91 runs sampled)
EventEmitter3 x 9,454,909 ops/sec ±0.55% (93 runs sampled)
Drip x 8,271,515 ops/sec ±0.56% (91 runs sampled)
fastemitter x 6,891,134 ops/sec ±0.63% (91 runs sampled)
event-emitter x 5,208,150 ops/sec ±0.80% (92 runs sampled)
contra/emitter x 992,965 ops/sec ±0.64% (91 runs sampled)
emitix x 16,192,381 ops/sec ±0.59% (87 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark add-remove.js

```
EventEmitter1 x 11,455,325 ops/sec ±0.61% (91 runs sampled)
EventEmitter2 x 7,461,420 ops/sec ±0.63% (87 runs sampled)
EventEmitter3 x 10,838,235 ops/sec ±2.73% (85 runs sampled)
Drip x 128,268,415 ops/sec ±8.30% (78 runs sampled)
fastemitter x 28,571,012 ops/sec ±0.75% (90 runs sampled)
event-emitter x 7,038,244 ops/sec ±0.69% (91 runs sampled)
contra/emitter x 12,833,798 ops/sec ±0.73% (89 runs sampled)
emitix x 51,657,211 ops/sec ±0.74% (90 runs sampled)
Fastest is [ 'Drip' ]
```
