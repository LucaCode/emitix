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
EventEmitter1 x 58,589,001 ops/sec ±0.50% (96 runs sampled)
EventEmitter2 x 111,992,554 ops/sec ±0.25% (100 runs sampled)
EventEmitter3 x 135,559,307 ops/sec ±0.09% (97 runs sampled)
Drip x 145,848,754 ops/sec ±0.08% (100 runs sampled)
fastemitter x 56,973,624 ops/sec ±0.94% (97 runs sampled)
event-emitter x 100,122,686 ops/sec ±0.11% (102 runs sampled)
contra/emitter x 33,185,710 ops/sec ±0.20% (99 runs sampled)
emitix x 135,030,539 ops/sec ±0.09% (100 runs sampled)
Fastest is [ 'Drip' ]
```

Benchmark remove-emit.js

```
EventEmitter1 x 24,904,043 ops/sec ±0.09% (99 runs sampled)
EventEmitter2 x 18,143,259 ops/sec ±0.06% (94 runs sampled)
EventEmitter3 x 27,398,792 ops/sec ±0.20% (98 runs sampled)
Drip x 22,788,137 ops/sec ±0.09% (100 runs sampled)
event-emitter x 12,244,696 ops/sec ±0.05% (101 runs sampled)
contra/emitter x 3,005,612 ops/sec ±0.08% (102 runs sampled)
emitix x 73,066,970 ops/sec ±0.08% (99 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark emit-multiple-listeners.js

```
EventEmitter1 x 5,663,707 ops/sec ±0.14% (97 runs sampled)
EventEmitter2 x 6,314,124 ops/sec ±0.12% (100 runs sampled)
EventEmitter3 x 10,441,426 ops/sec ±0.20% (99 runs sampled)
fastemitter x 8,683,069 ops/sec ±0.10% (99 runs sampled)
event-emitter x 4,142,417 ops/sec ±0.16% (96 runs sampled)
contra/emitter x 2,390,528 ops/sec ±0.14% (98 runs sampled)
emitix x 11,366,181 ops/sec ±0.24% (97 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark context.js

```
EventEmitter1 x 22,648,904 ops/sec ±0.06% (100 runs sampled)
EventEmitter2 x 17,024,772 ops/sec ±0.11% (98 runs sampled)
EventEmitter3 x 27,360,748 ops/sec ±0.20% (98 runs sampled)
Drip x 20,230,182 ops/sec ±0.08% (101 runs sampled)
fastemitter x 15,887,642 ops/sec ±0.07% (101 runs sampled)
event-emitter x 11,268,321 ops/sec ±0.07% (100 runs sampled)
contra/emitter x 2,974,037 ops/sec ±0.07% (102 runs sampled)
emitix x 74,624,854 ops/sec ±0.12% (101 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark once.js

```
EventEmitter1 x 16,334,275 ops/sec ±0.23% (96 runs sampled)
EventEmitter2 x 7,437,276 ops/sec ±0.12% (100 runs sampled)
EventEmitter3 x 52,237,110 ops/sec ±1.70% (101 runs sampled)
Drip x 36,568,646 ops/sec ±0.08% (99 runs sampled)
fastemitter x 19,619,835 ops/sec ±0.07% (97 runs sampled)
event-emitter x 8,682,365 ops/sec ±0.10% (100 runs sampled)
contra/emitter x 8,489,857 ops/sec ±0.07% (99 runs sampled)
emitix x 76,778,577 ops/sec ±0.12% (101 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark hundreds.js

```
EventEmitter1 x 658,362 ops/sec ±0.38% (98 runs sampled)
EventEmitter2 x 582,389 ops/sec ±0.17% (97 runs sampled)
EventEmitter3 x 728,340 ops/sec ±0.16% (100 runs sampled)
Drip x 884,288 ops/sec ±0.22% (94 runs sampled)
fastemitter x 822,465 ops/sec ±0.08% (97 runs sampled)
event-emitter x 597,494 ops/sec ±0.21% (95 runs sampled)
contra/emitter x 438,059 ops/sec ±0.09% (98 runs sampled)
emitix x 1,668,324 ops/sec ±0.11% (98 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark emit.js

```
EventEmitter1 x 25,017,630 ops/sec ±0.08% (98 runs sampled)
EventEmitter2 x 18,115,123 ops/sec ±0.06% (99 runs sampled)
EventEmitter3 x 27,518,658 ops/sec ±0.22% (100 runs sampled)
Drip x 23,228,632 ops/sec ±0.15% (95 runs sampled)
fastemitter x 17,157,283 ops/sec ±0.13% (100 runs sampled)
event-emitter x 12,269,394 ops/sec ±0.06% (94 runs sampled)
contra/emitter x 3,012,791 ops/sec ±0.09% (100 runs sampled)
emitix x 74,439,992 ops/sec ±0.09% (100 runs sampled)
Fastest is [ 'emitix' ]
```

Benchmark add-remove.js

```
EventEmitter1 x 27,880,886 ops/sec ±0.20% (96 runs sampled)
EventEmitter2 x 9,329,557 ops/sec ±0.08% (100 runs sampled)
EventEmitter3 x 111,107,789 ops/sec ±0.13% (100 runs sampled)
Drip x 150,663,327 ops/sec ±0.06% (99 runs sampled)
fastemitter x 67,929,098 ops/sec ±0.27% (97 runs sampled)
event-emitter x 16,852,233 ops/sec ±0.06% (96 runs sampled)
contra/emitter x 27,414,761 ops/sec ±0.08% (96 runs sampled)
emitix x 125,998,539 ops/sec ±0.13% (99 runs sampled)
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
