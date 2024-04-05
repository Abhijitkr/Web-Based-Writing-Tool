import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IBlock } from "../types/@types.block";
import { useContext } from "react";
import { GlobalContext } from "../state/GlobalContext";
import { IGlobalContext } from "../types/@types.globalContextType";

export const TipTapTitle = ({ block }: { block: IBlock }) => {
  const { blocks, setBlocks } = useContext(GlobalContext) as IGlobalContext;

  const extensions = [StarterKit];
  const editor = useEditor({
    extensions,
    content: block.title,
    injectCSS: true,
    editorProps: {
      attributes: {
        class: "p-2 focus:outline-none rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      const updatedBlocks = blocks.map((blk) =>
        blk.id === block.id ? { ...blk, title: editor.getText() } : blk
      );
      setBlocks(updatedBlocks);
    },
  });
  return <EditorContent editor={editor} />;
};
