export type TCategory = {
  id: number;
  length: number;
  nameTm: string;
  nameRu: string;
  descTm: string;
  descRu: string;
  harvestAmount: string;
  treeCount: number;
  image: string;
};

export type TCategorySendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type TCategoryItemSendInfo = {
  id?: number;
  nameTm?: string;
  nameRu?: string;
  descTm?: string;
  descRu?: string;
  harvestAmount?: string;
  harvestTime?: string;
  treeCount?: 0;
};
