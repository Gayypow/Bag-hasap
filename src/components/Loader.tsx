import type { FC } from "react";
import { Spin } from "antd";
const Loader: FC<{ height?: string }> = (props) => {
  const { height = "50vh" } = props;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <Spin size="large" />
    </div>
  );
};
export default Loader;
