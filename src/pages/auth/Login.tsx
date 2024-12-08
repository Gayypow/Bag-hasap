/* eslint-disable react-hooks/exhaustive-deps */
import {
  Typography,
  Form,
  Input,
  Button,
  Layout,
  notification,
  NotificationArgsProps,
  InputRef,
} from "antd";
import React, { FC, memo, useEffect, useMemo, useRef } from "react";
import loginStyle from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Garden ogo.png";
// import LanguageSelect from "../../components/language/LanguageSelect";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { useAuthMutation } from "../../store/api/auth.api";
import { setCookieWithMinutesExpiration } from "../../funtions";
import LanguageSelect from "../../components/LanguageSelect";

const { Title } = Typography;
type FieldType = {
  username?: string;
  password?: string;
  rememberMe?: string;
};
type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

const LoginPage: FC = memo(() => {
  const emailInputRef = useRef<InputRef>(null);
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [auth, { isSuccess, data, isError, error, isLoading }] =
    useAuthMutation();

  const openNotification = (
    info: {
      message: string;
      description: string;
      placement: NotificationPlacement;
      type: string;
    } = {
      message: "",
      description: "",
      placement: "topLeft",
      type: "error",
    }
  ) => {
    if (info.type === "error") {
      api.error({
        message: `${info?.message}`,
        description: (
          <Context.Consumer>{() => `${info.description}!`}</Context.Consumer>
        ),
        placement: info.placement,
      });
    } else {
      api.success({
        message: `${info?.message}`,
        description: (
          <Context.Consumer>{() => `${info.description}!`}</Context.Consumer>
        ),
        placement: info.placement,
      });
    }
  };

  const onFinish = async (e: FieldType) => {
    const credentials = {
      username: e.username,
      password: e.password,
    };

    await auth(credentials);
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  useEffect(() => {
    if (isError) {
      openNotification({
        placement: "bottomRight",
        message: t("Error"),
        description:
          (error as FetchBaseQueryError)?.status === 403
            ? t("LoginPasswordError")
            : (error as { data: { message: string } })?.data?.message,
        type: "error",
      });
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }
    if (isSuccess) {
      Cookies.remove("DR_AT");
      Cookies.remove("DR_RT");

      setCookieWithMinutesExpiration("DR_AT", data.token, 235);
      setCookieWithMinutesExpiration("DR_RT", data.refreshToken, 235);

      // localStorage.setItem("user", JSON.stringify(data.user));
      // dispatch(setUser(data.user));
      navigate("/");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Layout>
          <div className={loginStyle.wrapper}>
            <div className={loginStyle.leftSide}>
              <div className={loginStyle.languageBar}>
                <LanguageSelect />
              </div>
              <Form
                name="auth"
                className={loginStyle.authForm}
                layout="vertical"
                initialValues={{
                  rememberMe: true,
                }}
                onFinish={onFinish}
              >
                {/* <Form.Item> */}
                <div
                  style={{
                    display: "flex",
                    marginBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="DailyReports Web"
                    className={loginStyle.logo}
                  />
                  <div style={{ marginTop: "0", marginLeft: "20px" }}>
                    <Title level={4} style={{ marginTop: "0" }}>
                      {t("LoginTitle")}
                    </Title>
                  </div>
                </div>
                {/* </Form.Item> */}
                <Form.Item<FieldType>
                  hasFeedback
                  label={t("Username")}
                  name="username"
                  validateDebounce={700}
                  rules={[
                    {
                      required: true,
                      message: t("Required"),
                    },
                  ]}
                >
                  <Input
                    ref={emailInputRef}
                    autoFocus
                    placeholder={t("EmailPlaceholder")}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label={t("Password")}
                  name="password"
                  validateDebounce={700}
                  rules={[
                    {
                      required: true,
                      message: t("Required"),
                    },
                    {
                      min: 3,
                      message: t("PasswordNotValid"),
                    },
                  ]}
                >
                  <Input.Password placeholder={t("PasswordPlaceholder")} />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={isLoading}
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    {t("Login")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Layout>
      </Context.Provider>
    </>
  );
});
export default LoginPage;
