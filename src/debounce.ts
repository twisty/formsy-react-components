export interface DebouncedFunction extends Function {
  cancel: () => void;
  flush: () => void;
}

type Fn = (args?) => unknown;

export default (fn: Fn, time: number): DebouncedFunction => {
  let pending;
  let lastArgs;
  let lastThis;

  const cancel = (): void => {
    clearTimeout(pending);
    pending = undefined;
  };

  const run = (): void => {
    if (lastArgs) {
      const currentThis = lastThis;
      const currentArgs = lastArgs;
      lastThis = undefined;
      lastArgs = undefined;
      fn.apply(currentThis, currentArgs);
    }
  };

  const flush = (): void => {
    cancel();
    run();
  };

  function debounced(...args): void {
    lastThis = this;
    lastArgs = args;
    if (pending) {
      clearTimeout(pending);
    }
    pending = setTimeout(run, time);
  }

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
};
