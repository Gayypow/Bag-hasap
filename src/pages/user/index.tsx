/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "antd";
import { useGetUsersQuery } from "../../store/api/user.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetUserItemSendInfo,
  setUserItemSendInfo,
  setUserSendInfo,
} from "../../store/user/userSlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { TUser } from "../../types/user";
import UserModalComponent from "./modalContents/UserModalComponent";
import { EditOutlined } from "@ant-design/icons";

const Context = React.createContext({ name: "Default" });

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userSendInfo = useAppSelector((state) => state.user.userSendInfo);
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("userSendInfo");
  const sessionValue = parseValue ? JSON.parse(parseValue) : null;
  if (sessionValue) {
    tempSendInfo = {
      ...sessionValue,
    };
  }

  const {
    currentData: data = {
      result: [],
      dataCount: 0,
    },
    isLoading,
    isFetching,
    isError,
    error,
    isUninitialized,
  } = useGetUsersQuery(
    { ...userSendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setUserSendInfo(tempSendInfo));
  }, []);

  //setting breadcrumbs
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Users"),
          path: "/users",
        },
      ])
    );
  }, [language]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnsType<TUser> = [
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("No"),
          }}
        >
          {t("No")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "No",
      key: "No",
      width: `50px`,
      rowScope: "row",
      fixed: "left",
      render: (_: any, record: TUser, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (userSendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(userSendInfo?.offset ?? 0) + e + 1}
          </Typography.Text>
        );
      },
    },

    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Username"),
          }}
        >
          {t("Username")}
        </Typography.Text>
      ),
      dataIndex: "username",
      onHeaderCell: () => ({
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      key: "username",
      width: `200px`,
      render: (_: any, record: TUser) => (
        <Typography.Text ellipsis={{ tooltip: record?.username }}>
          {record?.username}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("FullName"),
          }}
        >
          {t("FullName")}
        </Typography.Text>
      ),
      dataIndex: "fullName",
      onHeaderCell: () => ({
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      key: "fullName",
      width: `200px`,
      render: (_: any, record: TUser) => (
        <Typography.Text ellipsis={{ tooltip: record?.fullName }}>
          {record?.fullName}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Role"),
          }}
        >
          {t("Role")}
        </Typography.Text>
      ),
      dataIndex: "role",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      key: "role",
      width: `100px`,
      render: (_: any, record: TUser) => (
        <Typography.Text ellipsis={{ tooltip: record?.role }}>
          {record?.role}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Contact"),
          }}
        >
          {t("Contact")}
        </Typography.Text>
      ),
      dataIndex: "contact",
      onHeaderCell: () => ({
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      key: "contact",
      width: `200px`,
      render: (_: any, record: TUser) => (
        <Typography.Text ellipsis={{ tooltip: record?.contact }}>
          {record?.contact}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Status"),
          }}
        >
          {t("Status")}
        </Typography.Text>
      ),
      dataIndex: "contstatusact",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      key: "status",
      width: `100px`,
      render: (_: any, record: TUser) => (
        <Typography.Text ellipsis={{ tooltip: record?.isActive }}>
          {record?.isActive ? "Active" : "Passive"}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Action"),
          }}
        >
          {t("Action")}
        </Typography.Text>
      ),
      dataIndex: "action",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      key: "action",
      width: `80px`,
      render: (_: any, record: TUser) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditUser")));
            dispatch(setModalComponentType("user"));
            dispatch(
              setUserItemSendInfo({
                id: record.id,
              })
            );
            dispatch(setIsModalComponentOpen(true));
          }}
          type="primary"
          size="small"
          icon={<EditOutlined />}
        />
      ),
    },
  ];
  return (
    <>
      <Context.Provider value={contextValue}>
        <UserModalComponent />
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: userSendInfo,
                  stateName: "userSendInfo",
                  setState: (value: any) => dispatch(setUserSendInfo(value)),
                },
                userSelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddUser")));
                  dispatch(resetUserItemSendInfo());
                  dispatch(setModalComponentType("user"));
                  dispatch(setUserItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [userSendInfo]
          )}
        />

        <TableComponent
          data={useMemo(
            () => ({
              data,
              isLoading,
              isError,
              error,
              isFetching,
              isUninitialized: isUninitialized,
            }),
            [data, isFetching, isUninitialized]
          )}
          columns={useMemo(() => columns as any, [data, language])}
          states={useMemo(
            () => ({
              state: userSendInfo,
              stateName: "userSendInfo",
              setState: (value: any) => dispatch(setUserSendInfo(value)),
            }),
            [userSendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Users;
