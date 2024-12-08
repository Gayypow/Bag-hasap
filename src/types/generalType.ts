/* eslint-disable @typescript-eslint/no-explicit-any */
export type TButtonObjProps = {
  padding?: string;
  excel?: boolean;
  isTitleDisplay?: boolean;
  add?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  filter?: {
    display: boolean;
    function?: () => void;
  };
  search?: {
    display: boolean;
    states: {
      state: any;
      stateName: string;
      setState: any;
    };
    userSelect?: boolean;
  };
  header?: string;
  stateInfo?: {
    state: any;
    setState: any;
    stateName: string;
  };
};
