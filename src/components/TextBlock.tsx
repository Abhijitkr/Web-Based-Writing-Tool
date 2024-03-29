import { Card, Flex } from "antd";
import { MdAddToPhotos } from "react-icons/md";
import { IBlock } from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";
import { useContext } from "react";

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
  return (
    <Card
      key={block.id}
      title={block.title}
      extra={
        <Flex align="center" gap={30} className="cursor-pointer">
          <MdAddToPhotos
            size="25"
            onClick={() => {
              setSelectedBlock(index);
              showModal(true);
            }}
          />
          {/* <MdDragIndicator
      size="25"
      onPointerDown={(event) => dragControls.start(event)}
      className="cursor-grab"
    /> */}
        </Flex>
      }
      className="my-5 shadow-md cursor-grab active:cursor-grabbing"
    >
      {block.description} {block.type}
    </Card>
  );
};
