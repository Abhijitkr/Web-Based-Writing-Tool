import { Dispatch, SetStateAction } from "react";
import {
  IBlock,
  ICreateBlock,
  TBlockQuantity,
  TBlockType,
} from "../types/@types.block";

export interface IGlobalContext {
  blocks: IBlock[];
  blockQuantity: TBlockQuantity;
  setBlockQuantity: Dispatch<SetStateAction<TBlockQuantity>>;
  blockType: TBlockType;
  setBlockType: Dispatch<SetStateAction<TBlockType>>;
  multiple: number;
  setMultiple: Dispatch<SetStateAction<number>>;
  isModalOpen: boolean;
  showModal: () => void;
  handleOk: (createBlock: ICreateBlock) => void;
  handleCancel: () => void;
}

