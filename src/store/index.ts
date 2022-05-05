import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();

//持久化存储
store.use(
  createPersistedState({
    // storage: localStorage,
    beforeRestore: () => {},
    afterRestore: () => {},
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  }),
);
export const setupStore = (app: App<Element>) => {
  app.use(store);
};

export { store };
