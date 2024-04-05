import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IBlock } from "../types/@types.block";
import { useContext, useState } from "react";
import { BiBold, BiCodeAlt, BiItalic, BiUnderline } from "react-icons/bi";
import Underline from "@tiptap/extension-underline";
import { Flex } from "antd";
import { IGlobalContext } from "../types/@types.globalContextType";
import { GlobalContext } from "../state/GlobalContext";

export const TipTapDesc = ({ block }: { block: IBlock }) => {
  const { blocks, setBlocks } = useContext(GlobalContext) as IGlobalContext;
  const maxWords = 25;
  const [remainingWords, setRemainingWords] = useState<number>(maxWords);
  const [isHovered, setIsHovered] = useState(false);

  const handleDescriptionChange = (editorContent: string) => {
    const newDescription = editorContent;
    const wordCount = newDescription.trim().split(/\s+/).filter(Boolean).length;
    const remaining = maxWords - wordCount;
    setRemainingWords(remaining >= 0 ? remaining : 0);

    const updatedBlocks = blocks.map((blk) =>
      blk.id === block.id ? { ...blk, description: editorContent } : blk
    );
    setBlocks(updatedBlocks);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (remainingWords <= 0) {
      if (["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        return;
      }
      e.preventDefault();
    }
  }

  const extensions = [StarterKit, Underline];

  const editor = useEditor({
    extensions,
    content: block.description,
    injectCSS: true,
    editorProps: {
      attributes: {
        class: "p-2 focus:outline-none font-serif text-base rounded-md",
      },
    },
    onUpdate({ editor }) {
      handleDescriptionChange(editor.getText());
    },
  });

  if (!editor) return null;

  return (
    <Flex
      vertical
      gap={5}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={` ${editor.isFocused || isHovered ? "block" : "hidden"}`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1 mx-1 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <BiBold size="20" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1 mx-1 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          <BiItalic size="20" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 mx-1 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <BiUnderline size="20" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`p-1 mx-1 ${editor.isActive("code") ? "bg-gray-300" : ""}`}
        >
          <BiCodeAlt size="20" />
        </button>
      </div>
      <div>
        <EditorContent editor={editor} onKeyDown={(e) => handleKeyDown(e)} />
        <p
          className={`p-2 ${remainingWords === 0 ? "text-red-600" : ""} ${
            editor.isFocused || isHovered ? "block" : "hidden"
          }`}
        >
          {remainingWords} words remaining
        </p>
      </div>
    </Flex>
  );
};
