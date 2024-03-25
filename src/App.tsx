import { Button, ConfigProvider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

const App: React.FC = () => (
  <Layout className="h-screen">
    <Header className="bg-white text-2xl font-semibold flex items-center justify-center shadow-sm">
      Web Based Writing Tool
    </Header>
    <Content className="container m-auto flex justify-center items-center">
      <Button
        type="none"
        className="h-20 w-40 bg-black text-white text-xl hover:bg-[#252323]  hover:text-white"
      >
        Add Block
      </Button>
      {/* <button className="h-20 w-40 bg-black text-white text-xl hover:bg-[#252323]  hover:text-white rounded-md ">
        Add Block
      </button> */}
    </Content>
    <Footer className="text-center text-xl font-semibold ">
      Made by Abhijit Kumar Mahato
    </Footer>
  </Layout>
);

export default App;
