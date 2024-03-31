import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IBlock } from "../types/@types.block";
import { useState } from "react";

export const TipTap = ({ block }: { block: IBlock }) => {
  const maxWords = 250;
  const [remainingWords, setRemainingWords] = useState<number>(maxWords);
  const extensions = [StarterKit];
  const editor = useEditor({
    extensions,
    content: block.description,
    onUpdate({ editor }) {
      handleDescriptionChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleDescriptionChange = (editorContent: string) => {
    const newDescription = editorContent;
    const wordCount = newDescription.trim().split(/\s+/).filter(Boolean).length;
    const remaining = maxWords - wordCount;
    console.log(remaining);
    setRemainingWords(remaining >= 0 ? remaining : 0);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (remainingWords <= 0) {
      if (["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        return;
      }
      e.preventDefault();
    }
  }

  return (
    <div>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          B
        </button>
      </div>
      <div>
        <EditorContent
          editor={editor}
          className="font-serif text-base"
          onKeyDown={(e) => handleKeyDown(e)}
          style={{ boxShadow: "none" }}
        />
        <p className={`${remainingWords === 0 ? "text-red-600" : ""}`}>
          {remainingWords} words remaining
        </p>
      </div>
    </div>
  );
};
