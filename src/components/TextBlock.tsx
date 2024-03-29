import { Card, Flex, Input } from "antd";
import { MdAddToPhotos } from "react-icons/md";
import { IBlock } from "../types/@types.block";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";
import { useContext, useState } from "react";

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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    blockId: number
  ) => {
    const newDescription = e.target.value;
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
  };

  return (
    <Card
      key={block.id}
      title={
        editingTitle ? (
          <Input
            value={block.title}
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
          {/* <MdDragIndicator
      size="25"
      onPointerDown={(event) => dragControls.start(event)}
      className="cursor-grab"
    /> */}
        </Flex>
      }
      className="my-5 shadow-md cursor-grab active:cursor-grabbing"
    >
      {editingDescription ? (
        <Input.TextArea
          value={block.description}
          onChange={(e) => handleDescriptionChange(e, block.id)}
          onBlur={() => setEditingDescription(false)}
          onPressEnter={() => setEditingDescription(false)}
          className="border p-2"
          placeholder="Enter description..."
          rows={2}
        />
      ) : (
        <span
          onClick={() => setEditingDescription(true)}
          className="cursor-pointer"
        >
          {block.description === ""
            ? "Enter description..."
            : block.description}
        </span>
      )}
    </Card>
  );
};
