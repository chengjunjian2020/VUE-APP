import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ProjectConfig } from '/@/types/config';
interface AppState {
  pageLoading: boolean;
  projectSetting: ProjectConfig;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectSetting: {
      removeAllRequestPadding: true,
    },
  }),
  actions: {
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading;
    },
  },
});

export default useAppStore(store);
