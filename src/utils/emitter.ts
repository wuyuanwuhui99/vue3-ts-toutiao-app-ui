import Mitt from 'mitt';

const emitter = new Mitt();

emitter.$on = emitter.on;
emitter.$off = emitter.off;
emitter.$emit = emitter.emit;

export default emitter;
