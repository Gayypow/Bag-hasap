export type TRole = "admin" | "gardener" | "agronomist";

export type TUser = {
  id: number;
  username: string;
  fullName: string;
  role: TRole;
  contact: string;
  isActive: boolean;
  createdAt: string;
};

export type TUserSendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type TUserItemSendInfo = {
  id?: number;
  username?: string;
  fullName?: string;
  role?: TRole;
  contact?: string;
  password?: string;
  isActive?: boolean;
};
