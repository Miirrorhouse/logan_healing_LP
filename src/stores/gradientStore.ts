type Listener = (value: boolean) => void;

let visible = false;
const listeners = new Set<Listener>();

export const gradientStore = {
  get: () => visible,
  set: (v: boolean) => {
    visible = v;
    listeners.forEach((l) => l(v));
  },
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
