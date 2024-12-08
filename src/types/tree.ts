/* eslint-disable @typescript-eslint/no-explicit-any */
export type TTree = {
  id: number;
  note: string;
  desc: string;
  geoData: {
    endX: number;
    endY: number;
    startX: number;
    startY: number;
  };
  gardenerId: number;
  rowId: number;
  categoryId: number;
  age: number;
  image: string;
  isHealthy: boolean;
  plantedDate: any;
  lastPrunedDate: any;
  isFruiting: boolean;
  overallHarvest: number;
};

export type TTreeSendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type TTreeItemSendInfo = any;
