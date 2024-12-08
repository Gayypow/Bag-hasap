export type TStats = {
  year: number;
  number: number;
};
export type TStatsCategory = {
  name: number;
  number: number;
};

export type tStatsRes = {
  irrigations: TStats;
  harvests: TStats;
  trees: TStats;
  categories: TStatsCategory;
};
