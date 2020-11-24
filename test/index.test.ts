/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

import EventEmitter from "../index";

import { assert, expect } from "chai";
import * as chai from "chai";
import * as sinon from 'sinon';

import * as cap from "chai-as-promised";
chai.use(cap)
chai.should();

describe('Emitix',() => {

    describe('On',() => {

        it('should trigger an on-listener with correct args', () => {
            const emitter = new EventEmitter<{downloaded: [string,{code: number,data: number[]}]}>();
            const listener = sinon.fake();
            emitter.on('downloaded',listener);

            const data: [string,{code: number,data: number[]}] = ['http',{code: 200,data: [1,2,3]}];

            emitter.emit('downloaded',...data);
            assert(listener.calledWith(...data));

            data[0] = 'ws';

            emitter.emit('downloaded',...data);
            assert(listener.calledWith(...data));

            assert(listener.calledTwice);
        });

        it('should trigger multiple on-listener with correct args', () => {
            const emitter = new EventEmitter<{newNumber: [number]}>();
            const listener: sinon.SinonSpy<any>[] = [];

            for(let i = 0; i < 20; i++) listener.push(sinon.fake())
            listener.forEach(l => emitter.on('newNumber',l))

            const data = 12;
            emitter.emit('newNumber',data);

            listener.forEach(l => assert(l.calledWith(data)));
        });

    })

    describe('Once',() => {

        it('should trigger an once-listener only once', () => {
            const emitter = new EventEmitter<{error: [Error]}>();
            const listener = sinon.fake();
            emitter.once('error',listener);

            const err = new Error();
            emitter.emit('error',err);
            emitter.emit('error',new Error());
            emitter.emit('error',new Error());

            assert(listener.calledOnceWith(err));
        });

        it('should resolve promise-based once-listener', async () => {
            const emitter = new EventEmitter<{error: [Error]}>();
            const promise = emitter.once('error');
            emitter.emit('error',new Error());
            return expect(promise).to.be.fulfilled;
        });

        it('should resolve promise-based once-listener with timeout', async () => {
            const emitter = new EventEmitter<{error: [Error]}>();
            const promise = emitter.once('error',20000);
            emitter.emit('error',new Error());
            return expect(promise).to.be.fulfilled;
        });

        it('should reject promise-based once-listener with reached timeout', async () => {
            const emitter = new EventEmitter<{error: [Error]}>();
            const promise = emitter.once('error',20);
            return expect(promise).to.be.eventually.rejectedWith(Error)
        });

        it('should trigger multiple once-listener with correct args', () => {
            const emitter = new EventEmitter<{newString: [string]}>();
            const listener: sinon.SinonSpy<any>[] = [];

            for(let i = 0; i < 20; i++) listener.push(sinon.fake())
            listener.forEach(l => emitter.once('newString',l))

            const data = 'str';
            emitter.emit('newString',data);

            listener.forEach(l => assert(l.calledWith(data)));

            emitter.emit('newString',data);

            listener.forEach(l => assert(l.calledOnce));
        });
    })

    describe('Off',() => {

        const testData = ([
            ['should remove the listener',(e,l) => e.off(l)],
            ['should remove the listener from an event',(e,l) => e.off('connect',l)],
            ['should remove all listeners from an event',e => e.off('connect')],
            ['should remove all events',e => e.off()]
        ] as [string,(emitter: EventEmitter<{'connect':[]}>,listener: () => void) => void][]);

        describe('On-Listener', () => {
            testData.forEach(([title,removeListener]) => {
                it(title, () => {
                    const emitter = new EventEmitter<{'connect':[]}>();
                    const listener = sinon.fake();
                    emitter.on('connect',listener);
                    removeListener(emitter,listener);
                    emitter.emit('connect');
                    assert(listener.notCalled);
                });
            })
        })

        describe('Once-Listener', () => {
            testData.forEach(([title,removeListener]) => {
                it(title, () => {
                    const emitter = new EventEmitter<{'connect':[]}>();
                    const listener = sinon.fake();
                    emitter.once('connect',listener);
                    removeListener(emitter,listener);
                    emitter.emit('connect');
                    assert(listener.notCalled);
                });
            })
        })

        it('Should remove one of two listeners from an event', () => {
            const emitter = new EventEmitter<{'connect':[]}>();
            const listener1 = sinon.fake();
            const listener2 = sinon.fake();

            emitter.on('connect',listener1);
            emitter.on('connect',listener2);

            emitter.off('connect',listener2);

            emitter.emit('connect');

            assert(listener2.notCalled);
            assert(listener1.calledOnce);
        })

        it('Should remove all added listeners from an event', () => {
            const emitter = new EventEmitter<{'connect':[]}>();
            const listener1 = sinon.fake();
            const listener2 = sinon.fake();

            emitter.on('connect',listener1);
            emitter.on('connect',listener2);

            emitter.off('connect',listener1);
            emitter.off('connect',listener2);

            emitter.emit('connect');

            assert(listener1.notCalled);
            assert(listener2.notCalled);
        })

        it('Should remove one of two listeners', () => {
            const emitter = new EventEmitter<{'connect':[]}>();
            const listener1 = sinon.fake();
            const listener2 = sinon.fake();

            emitter.on('connect',listener1);
            emitter.on('connect',listener2);

            emitter.off(listener2);

            emitter.emit('connect');

            assert(listener2.notCalled);
            assert(listener1.calledOnce);
        })
    })
})
