import {
  Card,
  Flex,
  GetProp,
  Input,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { GrInbox } from "react-icons/gr";
import { MdAddToPhotos } from "react-icons/md";
import { useContext, useState } from "react";
import { GlobalContext } from "../state/GlobalContext";
import { IGlobalContext } from "../types/@types.globalContextType";
import { IBlock } from "../types/@types.block";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IPreview {
  visible: boolean;
  image: string | undefined;
  name: string | undefined;
}

export const PictureBlock = ({
  block,
  index,
}: {
  block: IBlock;
  index: number;
}) => {
  const { showModal, setSelectedBlock, handleTitleChange } = useContext(
    GlobalContext
  ) as IGlobalContext;

  const [preview, setPreview] = useState<IPreview | null>(null);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreview({
      visible: true,
      image: src,
      name: file.name,
    });
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
            placeholder="Enter title"
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
      className="my-5 shadow-md cursor-grab active:cursor-grabbing "
    >
      <Upload
        name="file"
        listType="picture"
        action="http://localhost:5173/"
        accept=".jpeg, .png, .jpg"
        onPreview={onPreview}
        className="cursor-pointer p-2 flex flex-col justify-center gap-2"
      >
        <p className="flex justify-center">
          <GrInbox size="30" />
        </p>
        <p className="text-center">Click or drag file to this area to upload</p>
        <p className="text-center">
          Only Upload Picture type .jpeg, .png, .jpg allowed
        </p>
      </Upload>
      <Modal
        open={preview?.visible}
        onCancel={() => {
          if (preview) {
            setPreview({ ...preview, visible: false });
          }
        }}
        footer={null}
        title={preview?.name}
      >
        <img alt="Preview" className="w-full" src={preview?.image} />
      </Modal>
    </Card>
  );
};
