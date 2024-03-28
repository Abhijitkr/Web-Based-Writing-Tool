import { FC, ReactNode, createContext, useState } from "react";
import {
  IBlock,
  ICreateBlock,
  TBlockPosition,
  TBlockQuantity,
  TBlockType,
} from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [blockQuantity, setBlockQuantity] = useState<TBlockQuantity>("single");
  const [blockType, setBlockType] = useState<TBlockType>("text");
  const [blockPosition, setBlockPosition] = useState<TBlockPosition>("above");
  const [isPosition, setIsPosition] = useState<boolean>(false);
  const [multiple, setMultiple] = useState<number>(2);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  const showModal = (position: boolean) => {
    setIsModalOpen(true);
    position ? setIsPosition(true) : setIsPosition(false);
  };

  const handleOk = (createBlock: ICreateBlock) => {
    setIsModalOpen(false);

    let n: number;

    createBlock.quantity === "multiple" ? (n = createBlock.multiple) : (n = 1);

    const newBlocks = [...blocks];

    for (let i = 0; i < n; i++) {
      const newBlock: IBlock = {
        id: Math.random() + 1000,
        type: createBlock.type,
        title: "Your Card Title",
        description: "Your Card Description",
      };

      if (blockPosition === "above" && typeof selectedBlock === "number") {
        newBlocks.splice(selectedBlock, 0, newBlock);
      } else if (
        blockPosition === "below" &&
        typeof selectedBlock === "number"
      ) {
        newBlocks.splice(selectedBlock + 1, 0, newBlock);
      } else {
        newBlocks.push(newBlock);
      }
    }
    setBlocks(newBlocks);
    setSelectedBlock(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        blocks,
        setBlocks,
        showModal,
        isModalOpen,
        handleOk,
        blockType,
        blockQuantity,
        multiple,
        handleCancel,
        setBlockQuantity,
        setMultiple,
        setBlockType,
        blockPosition,
        setBlockPosition,
        isPosition,
        setSelectedBlock,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
