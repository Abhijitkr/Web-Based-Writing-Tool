import { Button, Card, Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useContext } from "react";
import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";
import { GlobalContext } from "./state/GlobalContext";
import { IGlobalContext } from "./types/@types.globalContextType";
import { ModalDefaultBlockPosition } from "./components/ModalDefaultBlockPosition";

const App: React.FC = () => {
  const { blocks, showModal } = useContext(GlobalContext) as IGlobalContext;

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
                onClick={showModal}
              >
                Add Block
              </Button>
              <ModalDefaultBlockPosition />
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
            <ModalDefaultBlockPosition />
          </Flex>
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default App;
