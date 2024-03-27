import { Header } from "antd/es/layout/layout";
import { FC } from "react";

export const HeaderComponent: FC = () => {
  return (
    <Header className="bg-white font-semibold flex text-2xl items-center justify-center shadow-sm">
      Web Based Writing Tool
    </Header>
  );
};
