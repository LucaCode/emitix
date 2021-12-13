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

### Protected class emitter
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

## Performance comparisons



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