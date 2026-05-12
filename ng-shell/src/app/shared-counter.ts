export interface GlobalCounter {
  get: () => number;
  set: (c: number) => void;
  subscribe: (l: (c: number) => void) => () => void;
}

export const getGlobalCounter = (): GlobalCounter => {
  const win = window as any;
  if (!win.__GLOBAL_COUNTER__) {
    let count = 0;
    const listeners = new Set<(c: number) => void>();
    win.__GLOBAL_COUNTER__ = {
      get: () => count,
      set: (c: number) => {
        count = c;
        listeners.forEach(l => l(count));
      },
      subscribe: (l: (c: number) => void) => {
        listeners.add(l);
        l(count);
        return () => { listeners.delete(l); };
      }
    };
  }
  return win.__GLOBAL_COUNTER__;
};
