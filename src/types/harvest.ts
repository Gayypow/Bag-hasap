/* eslint-disable @typescript-eslint/no-explicit-any */
export type THarvest = {
  id: number;
  quantity: number;
  quality: string;
  currency: number;
  date: any;
  note: string;
};

export type THarvestSendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type THarvestItemSendInfo = any;
