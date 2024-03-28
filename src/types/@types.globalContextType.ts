import { Dispatch, SetStateAction } from "react";
import {
  IBlock,
  ICreateBlock,
  TBlockPosition,
  TBlockQuantity,
  TBlockType,
} from "../types/@types.block";

export interface IGlobalContext {
  blocks: IBlock[];
  blockQuantity: TBlockQuantity;
  setBlockQuantity: Dispatch<SetStateAction<TBlockQuantity>>;
  blockType: TBlockType;
  setBlockType: Dispatch<SetStateAction<TBlockType>>;
  blockPosition: TBlockPosition;
  setBlockPosition: Dispatch<SetStateAction<TBlockPosition>>;
  isPosition: boolean;
  setIsPosition?: Dispatch<SetStateAction<boolean>>;
  multiple: number;
  setMultiple: Dispatch<SetStateAction<number>>;
  isModalOpen: boolean;
  // selectedBlock: number | null;
  setSelectedBlock: Dispatch<SetStateAction<number | null>>;
  showModal: (position: boolean) => void;
  handleOk: (createBlock: ICreateBlock) => void;
  handleCancel: () => void;
}
