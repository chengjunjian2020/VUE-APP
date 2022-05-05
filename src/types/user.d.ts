export interface UserInfo {
  id: string | number;
  username: string;
  avatar: string;
  email: string;
  status: number;
  sex: number;
  homePath?: string;
  roles: RoleInfo[];
}
export interface RoleInfo {
  roleName: string;
  value: string;
}
