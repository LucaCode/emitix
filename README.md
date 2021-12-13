# Emitix 🪄

[![Downloads](https://img.shields.io/npm/dm/emitix)](https://www.npmjs.com/package/emitix)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/emitix)](https://www.npmjs.com/package/emitix)
[![Test coverage](https://img.shields.io/badge/test%20coverage-97.03%20%25-brightgreen)](https://www.npmjs.com/package/emitix)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## What is Emitix
***Emitix*** is a high performance, modern, lightweight, and typesafe EventEmitter. 
The EventEmitter is highly optimized that making it one of the fastest EventEmitter available for Node.js and the browser (See benchmarks below).
The API is slightly different compared to the default shipped EventEmitter of Node.js.

## How to use Emitix

### Basic usage

```typescript
import EventEmitter, {EventListener} from "emitix";

interface User {
    id: string
    name: string
}

const groupEmitter = new EventEmitter<{
    join: [User],
    leave: [User,number]
}>();

//Adds an on-listener that gets invoked every time when the event fires.
groupEmitter.on("join", user => {})

//Adds a once-listener that gets invoked when the event fires and will be removed.
groupEmitter.once("join",user => {})

//Without a callback/listener, the once method returns a promise.
//An optional timeout can be provided as a second argument.
groupEmitter.once("join",5000).then(([user]) => {
    console.log(`A user: ${user.name} joined in time.`);
}).catch(() => {
    console.log("Timeout occurred...");
})

//Removes all on/once listeners from every event of the emitter.
groupEmitter.off();

//Removes all on/once listeners of the join event.
groupEmitter.off("join");

//EventListener utility type can be used to
//create a typesafe listener function as a variable.
const leaveListener: EventListener<typeof groupEmitter,"leave"> = (user,stayedSeconds) => {};
groupEmitter.on("leave", leaveListener)

//Removes the specific listener from the leave event.
groupEmitter.off("leave",leaveListener);

//Triggers an event.
//It will call every listener of the event with the provided arguments.
groupEmitter.emit("join",{id: "Q124",name: "Emitixa"});
groupEmitter.emit("leave",{id: "Q022",name: "Slowix"},2000);

//Returns currently registered events as a string array.
groupEmitter.events();

//Returns the count of listeners of every event.
groupEmitter.listenerCount();

//Returns the count of listeners of a specific event.
groupEmitter.listenerCount("join");
```

### Protected class event emitter
Use the Emitix event emitter with a class and let only the class trigger events internally.

```typescript
import EventEmitter from "emitix";

class Broker extends EventEmitter.Protected<{
    message: [string],
    error: [Error]
}>() {
    foo() {
        //Everything is okay
        this.emit("message","Hello!");
    }
}

const broker = new Broker();

//ERROR: Will not work emit is protected...
broker.emit("message","Hello from outside!");

//Everything is okay
broker.on("message", message => {})
```

## Performance comparison

Results are from a MacBook Air M1, in Node.js Version: 16.13.0 LTS.

Benchmark init.js

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

Benchmark remove-emit.js

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

Benchmark emit-multiple-listeners.js

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

Benchmark context.js

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

Benchmark once.js

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

Benchmark hundreds.js

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

Benchmark emit.js

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

Benchmark add-remove.js

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

## License

MIT License

Copyright (c) 2021 Ing. Luca Gian Scaringella

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.