import { defineStore } from 'pinia';
import { UserInfo } from '/@/types/user';
import { store } from '/@/store/';
interface UserState {
  userInfo: Nullable<UserInfo>;
  token: string;
}

/**
 * 用户模块
 * 根据业务后台解决进行扩展或者改动
 */
export const useUserStore = defineStore({
  id: 'user',
  persist: true, //表示是否启用持久化存储
  state: (): UserState => ({
    userInfo: null,
    token: '',
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo;
    },
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
export default useUserStore(store);
