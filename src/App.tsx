import { Button, Form, InputNumber, Layout, Modal, Radio } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";

type TBlockQuantity = "single" | "multiple";
// type TBlockType = "Text" | "Picture";

const App: React.FC = () => {
  const [blockQuantity, setBlockQuantity] = useState<TBlockQuantity>("single");
  // const [blockType, setBlockType] = useState<TBlockType>("Text");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout className="h-screen">
      <Header className="bg-white font-semibold flex text-2xl items-center justify-center shadow-sm">
        Web Based Writing Tool
      </Header>
      <Content className="container m-auto flex justify-center items-center">
        <Button
          className="h-20 w-40 text-white bg-black text-xl hover:bg-[#252323]  hover:text-white"
          onClick={showModal}
        >
          Add Block
        </Button>
        <Modal
          title="Choose Block"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Create"
          okButtonProps={{ className: "bg-black text-white" }}
          okType="default"
          width={400}
        >
          <Form layout="vertical">
            <Form.Item label="Block Quality:" name="blockQuantity">
              <Radio.Group
                onChange={(e) => setBlockQuantity(e.target.value)}
                defaultValue="single"
              >
                <Radio.Button value="single">Single</Radio.Button>
                <Radio.Button value="multiple">Multiple</Radio.Button>
                {blockQuantity === "multiple" ? (
                  <InputNumber
                    type="number"
                    min="2"
                    className="ml-2"
                    style={{ boxShadow: "none" }}
                  />
                ) : null}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Block Type:" name="blockType">
              <Radio.Group defaultValue="text">
                <Radio.Button value="text">Text</Radio.Button>
                <Radio.Button value="picture">Picture</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer className="text-center text-xl font-semibold ">
        Made by Abhijit Kumar Mahato
      </Footer>
    </Layout>
  );
};

export default App;
