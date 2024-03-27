export type TBlockQuantity = "single" | "multiple";
export type TBlockType = "text" | "picture";
export type TBlockPosition = "above" | "below";

export interface ICreateBlock {
  id?: number;
  position?: TBlockPosition;
  type: TBlockType;
  quantity: TBlockQuantity;
  multiple: number;
}

export interface IBlock {
  id: number;
  type: TBlockType;
  title: string;
  description: string;
}
