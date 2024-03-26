import {
  Button,
  Card,
  Flex,
  Form,
  InputNumber,
  Layout,
  Modal,
  Radio,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";

type TBlockQuantity = "single" | "multiple";
type TBlockType = "text" | "picture";

interface ICreateBlock {
  id: number;
  type: TBlockType;
  quantity: TBlockQuantity;
}

interface IBlock {
  id: number;
  type: TBlockType;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [blockQuantity, setBlockQuantity] = useState<TBlockQuantity>("single");
  const [blockType, setBlockType] = useState<TBlockType>("text");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blocks, setBlocks] = useState<IBlock[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (createBlock: ICreateBlock) => {
    setIsModalOpen(false);
    console.log(createBlock);
    setBlocks([
      ...blocks,
      {
        id: createBlock.id,
        type: createBlock.type,
        title: "Your Card Title",
        description: "Your Card Description",
      },
    ]);
  };
  console.log(blocks);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout className="h-screen">
      <Header className="bg-white font-semibold flex text-2xl items-center justify-center shadow-sm">
        Web Based Writing Tool
      </Header>
      <Content className="container mx-auto  mt-2 h-screen overflow-auto">
        {blocks.length > 0 ? (
          <div className="m-5 ">
            <h3 className="text-2xl text-center font-semibold ">Your Blocks</h3>
            <Flex justify="end">
              <Button
                className="text-white bg-black hover:text-white"
                onClick={showModal}
              >
                Add Block
              </Button>
              <Modal
                title="Choose Block"
                open={isModalOpen}
                onOk={() =>
                  handleOk({
                    id: Math.random() + 1000,
                    type: blockType,
                    quantity: blockQuantity,
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
                  initialValues={{ blockQuantity: "single", blockType: "text" }}
                >
                  <Form.Item label="Block Quality:" name="blockQuantity">
                    <Radio.Group
                      onChange={(e) => setBlockQuantity(e.target.value)}
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
                    <Radio.Group onChange={(e) => setBlockType(e.target.value)}>
                      <Radio.Button value="text">Text</Radio.Button>
                      <Radio.Button value="picture">Picture</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Modal>
            </Flex>

            {blocks.map((block) => (
              <Card
                key={block.id}
                title={block.title}
                extra={<a href="#">More</a>}
                className="my-5 shadow-md"
              >
                {block.description}
              </Card>
            ))}
          </div>
        ) : (
          <Flex align="center" justify="center" className="h-full">
            <Button
              className="h-20 w-40 text-white bg-black text-xl  hover:text-white"
              onClick={showModal}
            >
              Add Block
            </Button>
            <Modal
              title="Choose Block"
              open={isModalOpen}
              onOk={() =>
                handleOk({
                  id: Math.random() + 1000,
                  type: blockType,
                  quantity: blockQuantity,
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
                initialValues={{ blockQuantity: "single", blockType: "text" }}
              >
                <Form.Item label="Block Quality:" name="blockQuantity">
                  <Radio.Group
                    onChange={(e) => setBlockQuantity(e.target.value)}
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
                  <Radio.Group onChange={(e) => setBlockType(e.target.value)}>
                    <Radio.Button value="text">Text</Radio.Button>
                    <Radio.Button value="picture">Picture</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </Flex>
        )}
      </Content>
      <Footer className="text-center text-xl font-semibold ">
        Made by Abhijit Kumar Mahato
      </Footer>
    </Layout>
  );
};

export default App;
