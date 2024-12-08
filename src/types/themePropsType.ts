export enum EThemeEnum {
  "DEFAULT" = "default",
  "DARK" = "dark",
  "LIGHT" = "light",
}

export type TThemePropsType = {
  theme: EThemeEnum;
  primaryColor?: string;
  borderRadius: number;
  fontSize: number;
  cellPaddingBlock: number;
  cellPaddingInline: number;
};
