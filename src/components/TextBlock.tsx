import { Card, Flex, Input } from "antd";
import { MdAddToPhotos, MdDragIndicator } from "react-icons/md";
import { IBlock } from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";
import { useContext, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";

export const TextBlock = ({
  block,
  index,
}: {
  block: IBlock;
  index: number;
}) => {
  const { blocks, setBlocks, showModal, setSelectedBlock, handleTitleChange } =
    useContext(GlobalContext) as IGlobalContext;
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [editingDescription, setEditingDescription] = useState<boolean>(false);
  const maxWords = 250;
  const [remainingWords, setRemainingWords] = useState<number>(maxWords);

  const dragControls = useDragControls();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    blockId: number
  ) => {
    const newDescription = e.target.value;
    const wordCount = newDescription.trim().split(/\s+/).filter(Boolean).length;
    const remaining = maxWords - wordCount;
    if (remaining >= 0) {
      setRemainingWords(remaining);
      const updatedBlocks = blocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            description: newDescription,
          };
        }
        return block;
      });
      setBlocks(updatedBlocks);
    }
  };

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
        {editingDescription ? (
          <>
            <Input.TextArea
              id={`description-${block.id}`}
              defaultValue={block.description}
              onChange={(e) => handleDescriptionChange(e, block.id)}
              onBlur={() => setEditingDescription(false)}
              onPressEnter={() => setEditingDescription(false)}
              className="border p-2 font-serif text-base"
              autoSize={{ minRows: 3, maxRows: 10 }}
              style={{ boxShadow: "none" }}
              placeholder="Enter description..."
            />
            <p className={`${remainingWords === 0 ? "text-red-600" : ""}`}>
              {remainingWords} words remaining
            </p>
          </>
        ) : (
          <span
            onClick={() => setEditingDescription(true)}
            className="cursor-pointer font-serif text-base"
          >
            {block.description === ""
              ? "Enter description..."
              : block.description}
          </span>
        )}
      </Card>
    </Reorder.Item>
  );
};
