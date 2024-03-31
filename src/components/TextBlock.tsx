import { Card, Flex, Input } from "antd";
import { MdAddToPhotos, MdDragIndicator } from "react-icons/md";
import { IBlock } from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";
import { useContext, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { TipTap } from "./TipTap";

export const TextBlock = ({
  block,
  index,
}: {
  block: IBlock;
  index: number;
}) => {
  const { showModal, setSelectedBlock, handleTitleChange } = useContext(
    GlobalContext
  ) as IGlobalContext;
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card
        key={block.id}
        title={
          editingTitle ? (
            <Input
              defaultValue={block.title}
              onChange={(e) => handleTitleChange(e, block.id)}
              onBlur={() => setEditingTitle(false)}
              onPressEnter={() => setEditingTitle(false)}
              className="border p-2"
              placeholder="Enter title..."
            />
          ) : (
            <span
              onClick={() => setEditingTitle(true)}
              className="cursor-pointer"
            >
              {block.title === "" ? "Enter title..." : block.title}
            </span>
          )
        }
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
        <TipTap block={block} />
      </Card>
    </Reorder.Item>
  );
};
