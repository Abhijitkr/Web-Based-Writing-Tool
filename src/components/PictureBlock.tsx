import {
  Card,
  Flex,
  GetProp,
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
import { Reorder, useDragControls } from "framer-motion";
import { TipTapTitle } from "./TipTapTitle";

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
  const { showModal, setSelectedBlock } = useContext(
    GlobalContext
  ) as IGlobalContext;

  const [preview, setPreview] = useState<IPreview | null>(null);

  const dragControls = useDragControls();

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
    <Reorder.Item
      value={block}
      // dragListener={false}
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
            {/* <MdDragIndicator
              size="28"
              onPointerDown={(event) => dragControls.start(event)}
              className="cursor-grab active:cursor-grabbing"
            /> */}
          </Flex>
        }
        className="my-5 shadow-md select-none"
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
          <p className="text-center">
            Click or drag file to this area to upload
          </p>
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
    </Reorder.Item>
  );
};
