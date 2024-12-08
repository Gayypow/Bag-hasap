import {
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Grid, Switch, Typography, theme } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./navbar.module.scss";
import React, { useMemo } from "react"; // Import useRef and useEffect
import BreadCrumbs from "./Breadcrumbs";
import {
  setAppCustomization,
  setIsSidebarOpen,
} from "../../store/general/generalSlice";
import { FaRegMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { EThemeEnum, TThemePropsType } from "../../types/themePropsType";
import LanguageSelect from "../LanguageSelect";

const { useBreakpoint } = Grid;

const Context = React.createContext({ name: "Default" });

function Navbar() {
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleThemeChange = (checked: boolean) => {
    const newTheme = !checked ? EThemeEnum.DARK : EThemeEnum.LIGHT; // Determine the new theme based on the switch state
    dispatch(
      setAppCustomization({ theme: newTheme } as unknown as TThemePropsType)
    );
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      <nav
        className={styles["navbar"]}
        style={{
          backgroundColor: colorBgContainer,
          paddingRight: !screens.lg ? "20px" : 0,
          userSelect: "none",
        }}
      >
        <div className={styles["navbar-top"]}>
          {screens.lg ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="text"
                icon={
                  isSidebarOpen || (!isSidebarOpen && !screens.lg) ? (
                    <MenuFoldOutlined size={20} />
                  ) : (
                    <MenuUnfoldOutlined size={20} />
                  )
                }
                onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
                className={styles["sidebar-open-button"]}
              />
              <BreadCrumbs />
            </div>
          ) : (
            ""
          )}
          {!screens.lg && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => dispatch(setIsSidebarOpen(true))}
              style={{
                fontSize: "14px",
                width: "unset",
                height: "unset",
                padding: 0,
              }}
            />
          )}
          <div className={styles["navbar-items"]}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography.Text
                style={{
                  marginBottom: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaRegMoon />
              </Typography.Text>

              <Switch
                value={appCustomization.theme !== "dark"}
                onChange={handleThemeChange}
                className="switchMode"
              />
              <Typography.Text
                style={{
                  marginBottom: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IoIosSunny />
              </Typography.Text>
            </div>
            <Divider type="vertical" style={{ margin: "1px" }} />
            <LanguageSelect />
            <Divider type="vertical" style={{ margin: "1px" }} />
            <div style={{ marginRight: "20px", gap: "5px" }}>
              <Avatar
                shape="square"
                size={32}
                icon={<UserOutlined />}
                style={{ marginRight: "10px" }}
              />
              <Typography.Text>Didar Gayypow</Typography.Text>
            </div>
          </div>
        </div>
      </nav>
    </Context.Provider>
  );
}
export default React.memo(Navbar);
