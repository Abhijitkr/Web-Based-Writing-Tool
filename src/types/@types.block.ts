export type TBlockQuantity = "single" | "multiple";
export type TBlockType = "text" | "picture";

export interface ICreateBlock {
  id?: number;
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
