import { Card, Flex } from "antd";
import { MdAddToPhotos, MdDragIndicator } from "react-icons/md";
import { IBlock } from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";
import { useContext } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { TipTapDesc } from "./TipTapDesc";
import { TipTapTitle } from "./TipTapTitle";

export const TextBlock = ({
  block,
  index,
}: {
  block: IBlock;
  index: number;
}) => {
  const { showModal, setSelectedBlock } = useContext(
    GlobalContext
  ) as IGlobalContext;

  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card
        key={block.id}
        title={<TipTapTitle block={block} />}
        extra={
          <Flex align="center" gap={30} className="cursor-pointer">
            <MdAddToPhotos
              size="25"
              onClick={() => {
                setSelectedBlock(index);
                showModal(true);
              }}
            />

            <MdDragIndicator
              size="28"
              onPointerDown={(event) => dragControls.start(event)}
              className="cursor-grab active:cursor-grabbing"
            />
          </Flex>
        }
        className="my-5 shadow-md select-none"
      >
        <TipTapDesc block={block} />
      </Card>
    </Reorder.Item>
  );
};
