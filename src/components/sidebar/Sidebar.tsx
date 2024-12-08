/* eslint-disable react-refresh/only-export-components */
//style from scss
import styles from "./sidebar.module.scss";
//static materials
import img1 from "../../assets/bag_hasap 2.png";
import { version } from "../../../package.json";
//packages
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Drawer,
  Grid,
  Menu,
  Space,
  Typography,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
//hooks
import { useAppDispatch, useAppSelector } from "../../store/hooks";

//components
import SiderItems from "./SiderItems";
import { useTranslation } from "react-i18next";
import { setIsSidebarOpen } from "../../store/general/generalSlice";
import { logout } from "../../funtions";
import React from "react";

const { useBreakpoint } = Grid;
const StyledDrawer = styled(Drawer)`
  & .ant-drawer-body {
    position: relative;
    padding: 0;
    // overflow: hidden;
  }
  & .ant-drawer-close {
    display: none;
  }
  & .ant-drawer-header {
    padding: 0;
  }
`;
export const activeMode = () => {
  return location.pathname.split("/").splice(0, 3).join("/");
};

const bc = new BroadcastChannel("auth-channel");

const Sidebar = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isMinimized = useAppSelector((state) => state.general.isMinimized);
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);

  const logoWithOpenSection = () => {
    return (
      <Space className={styles["sidebar-logo-open-control"]}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={img1}
            alt="Bag Hasap"
            style={{
              height: "50px",
            }}
          />
          {isSidebarOpen && (
            <Typography.Title
              level={4}
              style={{ marginLeft: "10px", color: "#026932" }}
            >
              Bag Hasap
            </Typography.Title>
          )}
        </div>
        {!screens.lg && (
          <Button
            type="text"
            icon={
              isSidebarOpen || (!isSidebarOpen && !screens.lg) ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )
            }
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
            className={styles["sidebar-open-button"]}
          />
        )}
      </Space>
    );
  };

  const menuSection = () => {
    return (
      <Menu
        theme={appCustomization.theme === "dark" ? "dark" : "light"}
        selectedKeys={[activeMode()]}
        onSelect={({ key }) => {
          navigate(key);
        }}
        style={{
          fontSize: "14px",
          pointerEvents: isMinimized ? "none" : undefined,
        }}
        className={styles["menu-section"]}
        mode="inline"
        items={SiderItems()}
        onClick={(e) => {
          navigate(`${e.key}`, { replace: true });
        }}
      />
    );
  };

  const handleMenuItemClick = (key: string) => {
    if (key === "logout") {
      bc.postMessage("logout");
      logout();
      navigate("/login");
    }
  };

  const versionAndDownloadSection = (width: number) => {
    return (
      <>
        <div
          className={styles["version-and-download"]}
          style={{ width: `${width}px` }}
        >
          <Divider
            style={{ margin: "0 0 0 0", fontSize: "12px" }}
            orientation="center"
            plain
          ></Divider>
          <Menu
            onClick={(e) => {
              handleMenuItemClick(e.key);
            }}
            selectedKeys={[]}
            className={styles["menu_footer"]}
            mode="inline"
            items={[
              {
                key: "logout",
                icon: <RiLogoutBoxRLine />,
                label: t("Logout"),
              },
            ]}
          />
          <Divider
            style={{ margin: "0 0 2px 0", fontSize: "12px" }}
            orientation="left"
            plain
          >
            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
              v{version}{" "}
            </Typography.Text>
          </Divider>
        </div>
      </>
    );
  };

  return screens.lg ? (
    <Sider
      breakpoint="lg"
      width={280}
      trigger={null}
      collapsible
      collapsed={!isSidebarOpen}
      onCollapse={(value) => dispatch(setIsSidebarOpen(value))}
      className={styles["sidebar"]}
      style={{
        backgroundColor: colorBgContainer,
        userSelect: "none",
        boxShadow:
          appCustomization.theme === "dark"
            ? "0px 2px 8px 0px rgba(248, 248, 248, 0.15)"
            : "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
      }}
    >
      {logoWithOpenSection()}
      <Divider style={{ margin: "0 0 10px 0" }} />
      {menuSection()}
      {versionAndDownloadSection(isSidebarOpen ? 280 : 80)}
    </Sider>
  ) : (
    <StyledDrawer
      placement="left"
      closable={true}
      onClose={() => {
        dispatch(setIsSidebarOpen(false));
      }}
      closeIcon={false}
      width={280}
      open={isSidebarOpen}
      title={logoWithOpenSection()}
    >
      {menuSection()}
      {versionAndDownloadSection(280)}
    </StyledDrawer>
  );
};
export default React.memo(Sidebar);
