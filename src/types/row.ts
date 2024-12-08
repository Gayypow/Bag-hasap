import { Dayjs } from "dayjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TRow = {
  id: number;
  length: number;
  desc: string;
  geoData: {
    endX: number;
    endY: number;
    startX: number;
    startY: number;
  };
  lastIrrigationDate: string;
  updatedAt: string;
  createdAt: string;
};

export type TRowSendInfo = {
  keyword?: string;
  offset?: number;
  limit?: number;
};

export type TRowItemSendInfo = {
  id?: number;
  desc?: string;
  geoData?: any;
  lastIrrigationDate?: string | Dayjs;
  gardenerId?: any;
};
