import { Form, InputNumber, Modal, Radio } from "antd";
import { FC, useContext } from "react";
import { GlobalContext } from "../state/GlobalContext";
import { IGlobalContext } from "../types/@types.globalContextType";

export const ModalDefaultBlockPosition: FC = () => {
  const {
    isModalOpen,
    handleOk,
    blockType,
    blockQuantity,
    multiple,
    handleCancel,
    setBlockQuantity,
    setMultiple,
    setBlockType,
  } = useContext(GlobalContext) as IGlobalContext;

  return (
    <Modal
      title="Choose Block"
      open={isModalOpen}
      onOk={() =>
        handleOk({
          type: blockType,
          quantity: blockQuantity,
          multiple: multiple,
        })
      }
      onCancel={handleCancel}
      okText="Create"
      okButtonProps={{ className: "bg-black text-white" }}
      okType="default"
      width={400}
    >
      <Form
        layout="vertical"
        initialValues={{
          blockQuantity,
          blockType,
        }}
      >
        <Form.Item label="Block Quality:" name="blockQuantity">
          <Radio.Group onChange={(e) => setBlockQuantity(e.target.value)}>
            <Radio.Button value="single">Single</Radio.Button>
            <Radio.Button value="multiple">Multiple</Radio.Button>
            {blockQuantity === "multiple" ? (
              <InputNumber
                type="number"
                min={2}
                className="ml-2"
                style={{ boxShadow: "none" }}
                value={multiple}
                onChange={(val) => setMultiple(val as number)}
              />
            ) : null}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Block Type:" name="blockType">
          <Radio.Group onChange={(e) => setBlockType(e.target.value)}>
            <Radio.Button value="text">Text</Radio.Button>
            <Radio.Button value="picture">Picture</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
