import { FC, ReactNode, createContext, useState } from "react";
import {
  IBlock,
  ICreateBlock,
  TBlockQuantity,
  TBlockType,
} from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [blockQuantity, setBlockQuantity] = useState<TBlockQuantity>("single");
  const [blockType, setBlockType] = useState<TBlockType>("text");
  const [multiple, setMultiple] = useState<number>(2);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<IBlock[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (createBlock: ICreateBlock) => {
    setIsModalOpen(false);
    console.log(createBlock);

    let n: number;

    createBlock.quantity === "multiple" ? (n = createBlock.multiple) : (n = 1);

    for (let i = 0; i < n; i++) {
      setBlocks((prevBlocks) => [
        ...prevBlocks,
        {
          id: Math.random() + 1000,
          type: createBlock.type,
          title: "Your Card Title",
          description: "Your Card Description",
        },
      ]);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        blocks,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
