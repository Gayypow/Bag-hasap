/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { FaHome } from "react-icons/fa";
import React from "react";
function Breadcrumbs() {
  const breadcrumbs = useAppSelector((state) => state.general.breadcrumbs);
  const isMinimized = useAppSelector((state) => state.general.isMinimized);
  function itemRender(route: any, params: any, items: ItemType[], paths: any) {
    params;
    items;

    return !route.path ? (
      <Typography.Text
        type="secondary"
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "5px",
          fontSize: "14px",
        }}
      >
        {route.icon}
        {route.title}
      </Typography.Text>
    ) : (
      <Link
        to={paths.join("/")}
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "5px",
          fontSize: "14px",
        }}
      >
        {route.icon}
        {route.title}
      </Link>
    );
  }
  return (
    <Breadcrumb
      style={{
        userSelect: "none",
        pointerEvents: isMinimized ? "none" : undefined,
      }}
      items={[
        {
          path: "/",
          icon: <FaHome size={16} />,
        },
        ...breadcrumbs,
      ]}
      itemRender={itemRender}
    />
  );
}
export default React.memo(Breadcrumbs);
