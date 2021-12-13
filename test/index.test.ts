/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

import EventEmitter from "../index";

import { expect } from "chai";
import * as chai from "chai";
import * as sinon from 'sinon';

import * as cap from "chai-as-promised";
chai.use(cap)
chai.should();

describe('Emitix',() => {

    describe('on',() => {

        const testArgs = ([
            [],
            [true],
            [35,242],
            ['Luca','foo','emitix'],
            [{color: 'black',model: 'lambo'}],
            [24,34,23,65],
            ['a','b','c','d','e'],
            [{},[],{},[],{},[]],
            [null,23,undefined,34,24,21,424,34,623,5],
            [24,34,23,65,34,6,2,4,6,23,6,8,53],
        ] as any[][]);

        testArgs.forEach((args,index) => {
            it(index + '. should trigger an on-listener with correct args', () => {
                const emitter = new EventEmitter<any>();
                const listener = sinon.fake();
                emitter.on('data',listener);

                emitter.emit('data',...args);
                sinon.assert.calledWith(listener,...args);
            });
        });

        testArgs.forEach((args,index) => {
            it(index + '. should trigger multiple on-listener with correct args', () => {
                const emitter = new EventEmitter<any>();
                const listener: sinon.SinonSpy<any>[] = [];

                for(let i = 0; i < 20; i++) listener.push(sinon.fake())
                listener.forEach(l => emitter.on('data',l))

                emitter.emit('data',...args);
                listener.forEach(l => sinon.assert.calledWith(l,...args));
            });
        });

    })

    describe('once',() => {

        it('should trigger an once-listener only once', () => {
            const emitter = new EventEmitter<{error: [Error]}>();
            const listener = sinon.fake();
            emitter.once('error',listener);

            const err = new Error();
            emitter.emit('error',err);
            emitter.emit('error',new Error());
            emitter.emit('error',new Error());

            sinon.assert.calledOnceWithExactly(listener,err);
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

            listener.forEach(l => sinon.assert.calledWith(l,data));

            emitter.emit('newString',data);

            listener.forEach(l => sinon.assert.calledOnce(l));
        });
    })

    describe('off',() => {

        const testData = ([
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
                    sinon.assert.notCalled(listener);
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
                    sinon.assert.notCalled(listener);
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

            sinon.assert.notCalled(listener2);
            sinon.assert.calledOnce(listener1);
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

            sinon.assert.notCalled(listener1);
            sinon.assert.notCalled(listener2);
        })

        it('Should remove one of two listeners', () => {
            const emitter = new EventEmitter<{'connect':[]}>();
            const listener1 = sinon.fake();
            const listener2 = sinon.fake();

            emitter.on('connect',listener1);
            emitter.on('connect',listener2);

            emitter.off('connect',listener2);

            emitter.emit('connect');

            sinon.assert.notCalled(listener2);
            sinon.assert.calledOnce(listener1);
        })

        it('Should not throw an error when removing a not existing event', () => {
            const emitter = new EventEmitter<{'connect':[]}>();
            chai.expect(() => emitter.off('connect')).to.not.throw();
        })
    })

    describe('events',() => {

        it('should return all currently registered events.', () => {
            const emitter = new EventEmitter();

            emitter.once('channel/sub');
            emitter.once('channel/pub');

            chai.expect(emitter.events())
                .to.be.deep.equal(['channel/sub','channel/pub'])

            emitter.once('channel/unsub');
            emitter.on('connect', () => {});

            chai.expect(emitter.events())
                .to.be.deep.equal(['channel/sub','channel/pub','channel/unsub','connect'])
        })
    })

    describe('listenerCount',() => {

        it('should return the correct count of active listeners.', () => {
            const emitter = new EventEmitter();
            const listener = () => {};

            chai.expect(emitter.listenerCount()).to.be.equal(0);

            emitter.on('e1',listener);
            emitter.on('e1',listener);
            emitter.on('e2',listener);

            chai.expect(emitter.listenerCount()).to.be.equal(3);
            chai.expect(emitter.listenerCount('e2')).to.be.equal(1);
            chai.expect(emitter.listenerCount('e1')).to.be.equal(2);

            emitter.off('e2',listener);

            chai.expect(emitter.listenerCount()).to.be.equal(2);
        })

    })
})
