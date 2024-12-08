/* eslint-disable @typescript-eslint/no-explicit-any */
export type TIrrigation = {
  id: number;
  note: string;
  date: string;
};

export type TIrrigationSendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type TIrrigationItemSendInfo = {
  id?: number;
  note?: string;
  date?: any;
  rowIds?: number[];
};
