import { Button, Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useContext } from "react";
import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";
import { GlobalContext } from "./state/GlobalContext";
import { IGlobalContext } from "./types/@types.globalContextType";
import { ModalDefaultBlockPosition } from "./components/ModalDefaultBlockPosition";
import { Reorder } from "framer-motion";
import { PictureBlock } from "./components/PictureBlock";
import { IBlock } from "./types/@types.block";
import { TextBlock } from "./components/TextBlock";

const App: React.FC = () => {
  const { blocks, setBlocks, showModal } = useContext(
    GlobalContext
  ) as IGlobalContext;

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

            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks}>
              {blocks.map((block: IBlock, index: number) =>
                block.type === "picture" ? (
                  <PictureBlock block={block} index={index} key={block.id} />
                ) : (
                  <TextBlock block={block} index={index} key={block.id} />
                )
              )}
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
