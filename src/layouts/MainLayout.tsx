/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from "react";
import { Affix, Button, FloatButton, Grid, Layout } from "antd";
import styles from "./mainLayout.module.scss";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setIsMinimized,
  setIsModalComponentOpen,
} from "../store/general/generalSlice";
import Loader from "../components/Loader";
import { MdCreditScore } from "react-icons/md";
import Navbar from "../components/navbar/Navbar";
import { useProfileQuery } from "../store/api/auth.api";
import { setUser } from "../store/auth/authSlice";
const { useBreakpoint } = Grid;
const MainLayout = () => {
  const isMinimized = useAppSelector((state) => state.general.isMinimized);
  const modalComponentTitle = useAppSelector(
    (state) => state.general.modalComponentTitle
  );
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();

  const { currentData: profile = {} } = useProfileQuery({});
  useEffect(() => {
    dispatch(setUser(profile));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }} id="body">
      <Sidebar />
      <Layout
        className={styles["main-layout-container"]}
        style={{
          width: !screens.lg
            ? "100%"
            : isSidebarOpen
            ? "calc(100% - 280px)"
            : "calc(100% - 80px)",
          paddingLeft: !screens.lg ? "0" : isSidebarOpen ? "280px" : "80px",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <FloatButton.BackTop visibilityHeight={400} />

        <Suspense fallback={<Loader />}>
          <Content className={styles["content"]}>
            <Outlet />
          </Content>
        </Suspense>

        {isMinimized && (
          <Affix offsetBottom={23} style={{ marginLeft: "10px" }}>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              icon={<MdCreditScore />}
              type="primary"
              onClick={() => {
                dispatch(setIsMinimized(false));
                dispatch(setIsModalComponentOpen(true));
              }}
            >
              {`${modalComponentTitle}...`}
            </Button>
          </Affix>
        )}
      </Layout>
    </Layout>
  );
};
export default React.memo(MainLayout);
