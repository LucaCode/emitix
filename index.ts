/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

type ListenerFunction<T extends any[]> = (...args: T) => any;
type Events = {[key: string]: any[]};

function Events() {}

class Listener {
    readonly fn: ListenerFunction<any>;
    readonly once: boolean;
    constructor(fn: ListenerFunction<any>, once?: boolean) {
        this.fn = fn;
        this.once = once || false;
    }
}

function addEvent(emitter: EventEmitter,event: string, listener: Listener) {
    if (!emitter._events[event]) emitter._events[event] = listener, emitter._eventCount++;
    else if (Array.isArray(emitter._events[event])) (emitter._events[event] as any[]).push(listener)
    else emitter._events[event] = [emitter._events[event] as Listener,listener];
}

function rmOnceListener(emitter: EventEmitter, event: string, listener: Listener) {
    const lis: Listener | Listener[] | undefined | any = emitter._events[event];
    if(!lis) return;
    else if(lis.fn && lis == listener) clearEvent(emitter,event)
    else {
        for (let i = 0; i < lis.length; i++) if (lis[i] == listener) (lis as ListenerFunction<any>[]).splice(i, 1);
        if(lis.length === 0) clearEvent(emitter,event)
    }
}

function clearEvent(emitter: EventEmitter, event: string) {
    --emitter._eventCount === 0 ? (emitter._events = new Events(), emitter._eventCount = 0) : delete emitter._events[event];
}

export default class EventEmitter<T extends Events = any> {

    /**
     * @description
     * A creator that returns a timeout error that will
     * be thrown when a timeout is reached in a promise based once-listener.
     */
    public static onceTimeoutErrorCreator: () => Error = () => {
        const err = new Error('Once listener timeout reached.');
        err.name = 'Timeout';
        return err;
    }

    /**
     * @internal
     */
    _events: Record<any, Listener | Listener[]> = new Events();
    /**
     * @internal
     */
    _eventCount: number = 0;

    /**
     * @description
     * Removes all listeners.
     */
    public off()
    /**
     * @description
     * Removes all listeners of an event.
     * @param event
     */
    public off<E extends keyof T>(event: E)
    /**
     * Removes a specific listener of an event.
     * @param event
     * @param listener
     */
    public off<E extends keyof T>(event: E, listener: ListenerFunction<T[E]>)
    public off(event?: string, fn?: ListenerFunction<any>) {
        if(!event) this._events = new Events(), this._eventCount = 0;
        else if(!this._events[event!]) return;
        else if(!fn) return clearEvent(this,event)
        else {
            const lis: Listener | Listener[] | undefined | any = this._events[event];
            if(lis.fn && lis.fn === fn) return clearEvent(this,event)
            else {
                for (let i = 0; i < lis.length; i++) if (lis[i].fn == fn) (lis as ListenerFunction<any>[]).splice(i, 1);
                if(lis.length === 0) clearEvent(this,event)
            }
        }
    }

    /**
     * Removes all events that matches with the filter.
     * @param filter
     */
    public offEventsFilter(filter: (event: string) => boolean): void {
        const events = Object.keys(this._events);
        for(let i = 0, len = events.length; i < len; i++)
            if(filter(events[i])) clearEvent(this,events[i]);
    }

    /**
     * @description
     * Adds an on-listener to an event.
     * @param event
     * @param listener
     */
    public on<E extends keyof T>(event: E, listener: ListenerFunction<T[E]>)
    public on<E extends keyof T>(event: E, fn: ListenerFunction<T[E]>): void {
        addEvent(this,event as string,new Listener(fn));
    }

    /**
     * @description
     * Adds a once-listener to an event.
     * @param event
     * @param fn
     */
    public once<E extends keyof T>(event: E, fn: ListenerFunction<T[E]>): void
    /**
     * @description
     * Returns a promise that will be resolved with the arguments when the event has triggered.
     * A timeout can be added that will reject the promise when the timeout is reached.
     * @param event
     * @param timeout
     */
    public once<E extends keyof T>(event: E, timeout?: number): Promise<T[E]>
    public once<E extends keyof T>(event: string, v?: ListenerFunction<T[E]> | number) {
        if("function" === typeof v){ addEvent(this,event,new Listener(v,true)); return;}
        if(v) return new Promise((res,rej) => {
            let listener;
            const timeout = setTimeout(() => {
                rmOnceListener(this,listener,listener);
                rej(EventEmitter.onceTimeoutErrorCreator());
            },v);
            addEvent(this,event,listener = new Listener(function() {
                clearTimeout(timeout);
                res(arguments)
            },true));
        })
        else return new Promise((res) => addEvent(this,event,new Listener(res,true)))
    }

    /**
     * @description
     * Triggers an event with the given arguments.
     * @param event
     * @param args
     */
    // @ts-ignore
    public emit<E extends keyof T>(event: E, ...args: T[E])
    public emit<E extends keyof T>(event: E, a1, a2, a3, a4, a5) {
        const lis: Listener | Listener[] | undefined | any = this._events[event], len = arguments.length;
        if(!lis) return;
        if(lis.fn) {
            if(lis.once) rmOnceListener(this,event as string,lis);
            switch (len) {
                case 1: return lis.fn();
                case 2: return lis.fn(a1);
                case 3: return lis.fn(a1,a2);
                case 4: return lis.fn(a1,a2,a3);
                case 5: return lis.fn(a1,a2,a3,a4);
                case 6: return lis.fn(a1,a2,a3,a4,a5);
            }
            let i = 1, args = new Array(len -1);
            for (; i < len; i++) args[i - 1] = arguments[i];
            lis.fn.apply(null, args);
        }
        else {
            let args, j, i = 0;
            while(i < lis.length) {
                switch (len) {
                    case 1: lis[i].fn(); break;
                    case 2: lis[i].fn(a1); break;
                    case 3: lis[i].fn(a1,a2); break;
                    case 4: lis[i].fn(a1,a2,a3); break;
                    case 5: lis[i].fn(a1,a2,a3,a4); break;
                    case 6: lis[i].fn(a1,a2,a3,a4,a5); break;
                    default:
                        if (!args) for (j = 1, args = new Array(len -1); j < len; j++) args[j - 1] = arguments[j];
                        lis[i].fn.apply(null, args);
                }
                if(lis[i].once) rmOnceListener(this,event as string,lis[i]);
                else i++;
            }
        }
    }
}