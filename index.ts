/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

type Event<T extends any[]> = (...args: T) => any;
type Events = {[key: string]: any[]};

const enum EventPrefix {
    On,
    Once
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
    private _events: Record<any, Event<any> | Event<any>[]> = {};

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
    public off<E extends keyof T>(event: E, listener: Event<T[E]>)
    /**
     * Removes a specific listener from all events.
     * @param listener
     */
    public off(listener: Event<any>)
    public off(a1?: string | Event<any>, a2?: Event<any>) {
        if(typeof a1 === 'string') {
            if(a2) {
                EventEmitter._rmFnInEvent(this._events,EventPrefix.On + a1,a2);
                EventEmitter._rmFnInEvent(this._events,EventPrefix.Once + a1,a2);
            }
            else {
                delete this._events[EventPrefix.On + a1];
                delete this._events[EventPrefix.Once + a1];
            }
        }
        else if(a1) this._rmFnInEvents(this._events,a1);
        else this._events = {};
    }

    private _rmFnInEvents<E extends keyof T>(events: Record<any, Event<any> | Event<any>[]>,fn: Event<any>) {
        const keys = Object.keys(events);
        const len = keys.length;
        for(let i = 0; i < len; i++) EventEmitter._rmFnInEvent(events,keys[i],fn);
    }

    private static _rmFnInEvent(events: Record<any, Event<any> | Event<any>[]>, event: string, fn: Event<any>) {
        const fns: Event<any> | Event<any>[] | undefined = events[event];
        if(!fns) return;
        else if(typeof fns === 'function') {if(fns === fn) return delete events[event];}
        else {
            const index = fns.indexOf(fn);
            if(index > -1) {
                fns.splice(index,1)
                if(fns.length === 0) delete events[event];
            }
        }
    }

    /**
     * @description
     * Adds an on-listener to an event.
     * @param event
     * @param listener
     */
    public on<E extends keyof T>(event: E, listener: Event<T[E]>)
    public on<E extends keyof T>(event: E, fn: Event<T[E]>): void {
        this._addFn(EventPrefix.On + (event as string),fn);
    }

    /**
     * @description
     * Adds a once-listener to an event.
     * @param event
     * @param fn
     */
    public once<E extends keyof T>(event: E, fn: Event<T[E]>): void
    /**
     * @description
     * Returns a promise that will be resolved with the arguments when the event has triggered.
     * A timeout can be added that will reject the promise when the timeout is reached.
     * @param event
     * @param timeout
     */
    public once<E extends keyof T>(event: E, timeout?: number): Promise<T[E]>
    public once<E extends keyof T>(event: string, v?: Event<T[E]> | number) {
        event = EventPrefix.Once + (event as string);
        if(typeof v === 'function') return this._addFn(event,v);
        if(v) return new Promise((res,rej) => {
            let listener;
            const timeout = setTimeout(() => {
                EventEmitter._rmFnInEvent(this._events,event,listener);
                rej(EventEmitter.onceTimeoutErrorCreator());
            },v);
            this._addFn(event,listener = (...args) => {
                clearTimeout(timeout);
                res(args)
            });
        })
        else return new Promise((res) => this._addFn(event,(...args) => res(args)));
    }

    private _addFn(event: string, fn: Event<any>): void {
        if (!this._events[event]) this._events[event] = fn;
        else if (Array.isArray(this._events[event])) (this._events[event] as any[]).push(fn)
        else this._events[event] = [this._events[event] as Event<any>,fn];
    }

    /**
     * @description
     * Triggers an event with the given arguments.
     * @param event
     * @param args
     */
    public emit<E extends keyof T>(event: E, ...args: T[E]) {
        EventEmitter._emit(this._events[EventPrefix.On + (event as string)],args);
        const onceKey = EventPrefix.Once + (event as string);
        EventEmitter._emit(this._events[onceKey],args);
        delete this._events[onceKey];
    }

    private static _emit(fns: Event<any> | Event<any>[],args: any[]) {
        if(fns)
            if(typeof fns === 'function') fns(...args);
            else {
                const len = fns.length;
                for(let i = 0; i < len; i++) fns[i](...args);
            }
    }
}