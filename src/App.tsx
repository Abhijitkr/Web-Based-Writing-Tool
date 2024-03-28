import { Button, Card, Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useContext } from "react";
import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";
import { GlobalContext } from "./state/GlobalContext";
import { IGlobalContext } from "./types/@types.globalContextType";
import { ModalDefaultBlockPosition } from "./components/ModalDefaultBlockPosition";
import { MdAddToPhotos } from "react-icons/md";
import { Reorder } from "framer-motion";

const App: React.FC = () => {
  const { blocks, setBlocks, showModal, setSelectedBlock } = useContext(
    GlobalContext
  ) as IGlobalContext;
  // const dragControls = useDragControls();

  return (
    <Layout className="h-screen">
      <HeaderComponent />
      <Content className="container mx-auto  mt-2 h-screen overflow-auto">
        {blocks.length > 0 ? (
          <div className="m-5 ">
            <h3 className="text-2xl text-center font-semibold ">Your Blocks</h3>
            <Flex justify="end">
              <Button
                className="text-white bg-black hover:text-white"
                onClick={() => showModal(false)}
              >
                Add Block
              </Button>
              <ModalDefaultBlockPosition />
            </Flex>

            <Reorder.Group values={blocks} onReorder={setBlocks}>
              {blocks.map((block, index) => (
                <Reorder.Item
                  value={block}
                  key={block.id}
                  // dragListener={false}
                  // dragControls={dragControls}
                >
                  <Card
                    key={block.id}
                    title={block.title}
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
                    {block.description} {block.type}
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ) : (
          <Flex align="center" justify="center" className="h-full">
            <Button
              className="h-20 w-40 text-white bg-black text-xl  hover:text-white"
              onClick={() => showModal(false)}
            >
              Add Block
            </Button>
            <ModalDefaultBlockPosition />
          </Flex>
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default App;
