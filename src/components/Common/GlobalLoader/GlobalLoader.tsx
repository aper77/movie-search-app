import { FC } from "react";
import { Layout, Spin } from "antd";

const GlobalLoader: FC = () => {
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </Layout>
  );
};

export default GlobalLoader;
