import { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
import { PiUsersThreeLight } from "react-icons/pi";
import {
  OrderedListOutlined,
  LineChartOutlined,
  ExperimentOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";

export type MenuItem = Required<MenuProps>["items"][number];

const SiderItems: () => MenuItem[] = () => {
  const { t } = useTranslation();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    visible?: boolean,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    if (visible) {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    } else {
      return null;
    }
  }

  return [
    getItem(
      t("Dashboard"),
      "/",
      true,
      <LineChartOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
      t("Users"),
      "/users",
      true,
      <PiUsersThreeLight style={{ fontSize: "20px" }} />
    ),
    getItem(
      t("Rows"),
      "/rows",
      true,
      <OrderedListOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
      t("Categories"),
      "/categories",
      true,
      <TagsOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
      t("Trees"),
      "/trees",
      true,
      <EnvironmentOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
      t("Irrigations"),
      "/irrigations",
      true,
      <ExperimentOutlined style={{ fontSize: "20px" }} />
    ),

    getItem(
      t("Harvests"),
      "/harvests",
      true,
      <ReconciliationOutlined style={{ fontSize: "20px" }} />
    ),
  ];
};
export default SiderItems;
