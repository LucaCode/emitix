# These benchmarks are an adjusted copy from the eventemitter3 benchmarks.

Starting benchmark init.js

```
EventEmitter1 x 59,005,676 ops/sec ±0.60% (96 runs sampled)
EventEmitter2 x 112,062,368 ops/sec ±0.26% (101 runs sampled)
EventEmitter3 x 135,817,944 ops/sec ±0.13% (99 runs sampled)
Drip x 145,594,169 ops/sec ±0.09% (97 runs sampled)
fastemitter x 57,603,944 ops/sec ±0.92% (99 runs sampled)
event-emitter x 100,100,598 ops/sec ±0.08% (101 runs sampled)
contra/emitter x 30,022,671 ops/sec ±13.44% (100 runs sampled)
emitix x 134,121,733 ops/sec ±0.12% (98 runs sampled)
Fastest is [ 'Drip' ]
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 24,964,281 ops/sec ±0.06% (100 runs sampled)
EventEmitter2 x 18,066,864 ops/sec ±0.07% (100 runs sampled)
EventEmitter3 x 27,390,140 ops/sec ±0.16% (95 runs sampled)
Drip x 22,793,364 ops/sec ±0.10% (101 runs sampled)
event-emitter x 12,254,130 ops/sec ±0.11% (98 runs sampled)
contra/emitter x 3,012,635 ops/sec ±0.10% (97 runs sampled)
emitix x 72,520,826 ops/sec ±0.09% (102 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 5,707,836 ops/sec ±0.09% (98 runs sampled)
EventEmitter2 x 6,386,203 ops/sec ±0.11% (100 runs sampled)
EventEmitter3 x 10,454,073 ops/sec ±0.40% (96 runs sampled)
fastemitter x 8,720,458 ops/sec ±0.11% (93 runs sampled)
event-emitter x 4,165,803 ops/sec ±0.11% (99 runs sampled)
contra/emitter x 2,407,096 ops/sec ±0.12% (96 runs sampled)
emitix x 12,094,835 ops/sec ±0.11% (98 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark context.js

```
EventEmitter1 x 22,662,181 ops/sec ±0.06% (99 runs sampled)
EventEmitter2 x 16,986,747 ops/sec ±0.08% (96 runs sampled)
EventEmitter3 x 27,675,995 ops/sec ±0.18% (99 runs sampled)
Drip x 20,334,503 ops/sec ±0.06% (99 runs sampled)
fastemitter x 15,778,095 ops/sec ±0.10% (102 runs sampled)
event-emitter x 11,364,442 ops/sec ±0.08% (101 runs sampled)
contra/emitter x 2,964,831 ops/sec ±0.08% (100 runs sampled)
emitix x 73,864,429 ops/sec ±0.16% (102 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark once.js

```
EventEmitter1 x 16,294,281 ops/sec ±0.22% (93 runs sampled)
EventEmitter2 x 7,468,197 ops/sec ±0.08% (102 runs sampled)
EventEmitter3 x 52,388,941 ops/sec ±0.11% (98 runs sampled)
Drip x 36,650,858 ops/sec ±0.10% (100 runs sampled)
fastemitter x 19,647,230 ops/sec ±0.07% (97 runs sampled)
event-emitter x 8,672,946 ops/sec ±0.79% (97 runs sampled)
contra/emitter x 8,482,959 ops/sec ±0.08% (99 runs sampled)
emitix x 75,893,403 ops/sec ±1.71% (100 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark hundreds.js

```
EventEmitter1 x 714,738 ops/sec ±0.32% (95 runs sampled)
EventEmitter2 x 605,250 ops/sec ±0.13% (98 runs sampled)
EventEmitter3 x 760,574 ops/sec ±0.15% (92 runs sampled)
Drip x 955,519 ops/sec ±0.09% (97 runs sampled)
fastemitter x 829,996 ops/sec ±0.11% (97 runs sampled)
event-emitter x 618,574 ops/sec ±0.11% (100 runs sampled)
contra/emitter x 446,893 ops/sec ±0.12% (98 runs sampled)
emitix x 1,668,782 ops/sec ±0.13% (97 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark emit.js

```
EventEmitter1 x 25,020,393 ops/sec ±0.13% (99 runs sampled)
EventEmitter2 x 18,261,030 ops/sec ±0.11% (96 runs sampled)
EventEmitter3 x 27,950,613 ops/sec ±0.17% (99 runs sampled)
Drip x 23,260,097 ops/sec ±0.30% (99 runs sampled)
fastemitter x 17,149,817 ops/sec ±0.11% (99 runs sampled)
event-emitter x 12,234,648 ops/sec ±0.08% (100 runs sampled)
contra/emitter x 3,023,930 ops/sec ±0.12% (96 runs sampled)
emitix x 74,094,108 ops/sec ±0.10% (101 runs sampled)
Fastest is [ 'emitix' ]
```

Starting benchmark add-remove.js

```
EventEmitter1 x 28,070,559 ops/sec ±0.23% (95 runs sampled)
EventEmitter2 x 9,556,013 ops/sec ±0.07% (100 runs sampled)
EventEmitter3 x 112,383,809 ops/sec ±0.16% (101 runs sampled)
Drip x 151,201,787 ops/sec ±0.11% (99 runs sampled)
fastemitter x 67,179,439 ops/sec ±0.23% (96 runs sampled)
event-emitter x 16,868,149 ops/sec ±0.07% (97 runs sampled)
contra/emitter x 27,568,673 ops/sec ±0.07% (100 runs sampled)
emitix x 127,590,260 ops/sec ±0.11% (97 runs sampled)
Fastest is [ 'Drip' ]
```
