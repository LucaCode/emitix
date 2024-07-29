/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

type ListenerFunction<T extends any[]> = (...args: T) => any;
type Events = {[key: string]: any[]};

type EventEmitterEvents<T extends EventEmitter<any>> = T extends EventEmitter<infer E> ? E : never;
export type EventListener<T extends EventEmitter<any>,E extends keyof EventEmitterEvents<T>>
    = ListenerFunction<EventEmitterEvents<T>[E]>;

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

function rmFirstListenerInstance(emitter: EventEmitter, event: string, listener: Listener) {
    const lis: Listener | Listener[] | undefined | any = emitter._events[event];
    if(!lis) return;
    else if(lis.fn && lis == listener) clearEvent(emitter,event)
    else {
        for (let i = lis.length - 1; i > -1; i--) if (lis[i] == listener) {
            (lis as ListenerFunction<any>[]).splice(i, 1);
            break;
        }
        if(lis.length === 0) clearEvent(emitter,event)
    }
}

function clearEvent(emitter: EventEmitter, event: string) {
    --emitter._eventCount === 0 ? (emitter._events = new Events(), emitter._eventCount = 0) : delete emitter._events[event];
}

class ProtectedEventEmitterEmit<T extends Events = any> {
    /**
     * @description
     * Triggers an event with the given arguments.
     * @param event
     * @param args
     */
    protected emit<E extends keyof T>(event: E, ...args: T[E]) {}
}

export namespace EventEmitter {
    export type Protected<T extends Events = any> = Omit<EventEmitter<T>,"emit"> & ProtectedEventEmitterEmit<T>;
    //export const Protected: new <T extends Events = any>() => EventEmitter.Protected<T> = (() => EventEmitter) as any;
}
export class EventEmitter<T extends Events = any> {

    public static Protected: new <T extends Events = any>() => EventEmitter.Protected<T> = (() => EventEmitter) as any;

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
    public off(): void
    /**
     * @description
     * Removes all listeners of an event.
     * @param event
     */
    public off<E extends keyof T>(event: E): void
    /**
     * @description
     * Removes a specific listener of an event.
     * @param event
     * @param listener
     */
    public off<E extends keyof T>(event: E, listener: ListenerFunction<T[E]>): void
    public off(event?: string, fn?: ListenerFunction<any>): void {
        if(!event) this._events = new Events(), this._eventCount = 0;
        else if(!this._events[event!]) return;
        else if(!fn) return clearEvent(this,event)
        else {
            const lis: Listener | Listener[] | undefined | any = this._events[event];
            if(lis.fn && lis.fn === fn) return clearEvent(this,event)
            else {
                const newLis: Listener[] = [];
                for (let i = 0, length = lis.length; i < length; i++)
                    if (lis[i].fn != fn) newLis.push(lis[i]);
                if(newLis.length) this._events[event] = newLis.length === 1 ? newLis[0]! : newLis;
                else clearEvent(this,event);
            }
        }
    }

    /**
     * @description
     * Returns currently registered event names.
     */
    public events(): string[] {
        return Object.keys(this._events);
    }

    /**
     * @description
     * Returns the count of active listeners.
     * When an event is provided, it returns only
     * the count of active listeners for this specific event.
     * @param event
     */
    public listenerCount<E extends keyof T>(event?: E): number {
        if(event != null) {
            const lis: Listener | Listener[] | undefined | any = this._events[event];
            return !lis ? 0 : (lis.fn ? 1 : lis.length);
        }
        const events = Object.keys(this._events);
        let lis: Listener | Listener[] | undefined | any,
            count = 0, len = events.length, i = 0;
        for(; i < len; i++) {
            lis = this._events[events[i]];
            if(!lis) continue;
            count += lis.fn ? 1 : lis.length;
        }
        return count;
    }

    /**
     * @description
     * Adds an on-listener to an event.
     * @param event
     * @param listener
     */
    public on<E extends keyof T>(event: E, listener: ListenerFunction<T[E]>): void
    public on<E extends keyof T>(event: E, fn: ListenerFunction<T[E]>): void {
        addEvent(this,event as string,new Listener(fn));
    }

    /**
     * @description
     * Adds a once-listener to an event.
     * @param event
     * @param listener
     */
    public once<E extends keyof T>(event: E, listener: ListenerFunction<T[E]>): void
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
                rmFirstListenerInstance(this,event,listener);
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
    public emit<E extends keyof T>(event: E, ...args: T[E]): void
    public emit<E extends keyof T>(event: E, a1, a2, a3): void {
        const lis: Listener | Listener[] | undefined | any = this._events[event], len = arguments.length;
        if(!lis) return;
        if(lis.fn) {
            if(lis.once) clearEvent(this,event as string);
            return len == 1 ? lis.fn() : len == 2 ? lis.fn(a1) : len == 3 ? lis.fn(a1,a2) : len == 4 ? lis.fn(a1,a2,a3) :
                lis.fn.apply(null,Array.from(arguments).slice(1));
        }
        else {
            let args, i = 0, l;
            while(i < lis.length) {
                l = lis[i];
                if(l.once) {
                    lis.splice(i, 1);
                    if(lis.length === 0) clearEvent(this,event as string);
                }
                else i++;
                len == 1 ? l.fn() : len == 2 ? l.fn(a1) : len == 3 ? l.fn(a1,a2) : len == 4 ? l.fn(a1,a2,a3) :
                    l.fn.apply(null, args || (args = Array.from(arguments).slice(1)));
            }
        }
    }
}

export default EventEmitter;