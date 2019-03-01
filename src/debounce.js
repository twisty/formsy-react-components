const debounce = (fn, time) => {
  let pending;
  let lastArgs;
  let lastThis;

  const cancel = () => {
    clearTimeout(pending);
    pending = undefined;
  };

  const run = () => {
    if (lastArgs) {
      const currentThis = lastThis;
      const currentArgs = lastArgs;
      lastThis = undefined;
      lastArgs = undefined;
      fn.apply(currentThis, currentArgs);
    }
  };

  const flush = () => {
    cancel();
    run();
  };

  function debounced(...args) {
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

export default debounce;
