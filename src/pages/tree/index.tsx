/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image, Spin, Typography } from "antd";
import { useGetTreesQuery } from "../../store/api/tree.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetTreeItemSendInfo,
  setTreeItemSendInfo,
  setTreeSendInfo,
} from "../../store/tree/treeSlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { TTree } from "../../types/tree";
// import TreeModalComponent from "./modalContents/TreeModalComponent";
import { EditOutlined } from "@ant-design/icons";
import noImage from "../../assets/no-image.png";
import moment from "moment";

const Context = React.createContext({ name: "Default" });

const Trees = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const treeSendInfo = useAppSelector((state) => state.tree.treeSendInfo);
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("treeSendInfo");
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
  } = useGetTreesQuery(
    { ...treeSendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setTreeSendInfo(tempSendInfo));
  }, []);

  //setting breadcrumbs
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Categories"),
          path: "/categories",
        },
      ])
    );
  }, [language]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnsType<TTree> = [
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
      width: `70px`,
      rowScope: "row",
      fixed: "left",
      render: (_: any, record: TTree, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (treeSendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(treeSendInfo?.offset ?? 0) + e + 1}
          </Typography.Text>
        );
      },
    },
    {
      title: t("Image"),
      dataIndex: "Image",
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      key: "iamge",
      width: `100px`,
      render: (_, record) => (
        <div>
          <Image
            placeholder={<Spin size="large" />}
            width={48}
            style={{ maxHeight: "80px" }}
            src={
              import.meta.env.VITE_STATIC_URL +
              record.image?.replace("./public", "")
            }
            fallback={noImage}
          />
        </div>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("note"),
          }}
        >
          {t("note")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "note",
      key: "note",
      // width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.note }}>
          {record?.note}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("plantedDate"),
          }}
        >
          {t("plantedDate")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "plantedDate",
      key: "plantedDate",
      width: `200px`,
      render: (datetime_: any) => (
        <Typography.Text
          ellipsis={{ tooltip: moment(datetime_).format("DD.MM.YYYY") }}
        >
          {moment(datetime_).format("DD.MM.YYYY")}
        </Typography.Text>
      ),
    },

    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Age"),
          }}
        >
          {t("Age")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "age",
      key: "age",
      width: `150px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.age }}>
          {record?.age}
        </Typography.Text>
      ),
    },

    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("OverallHarvest"),
          }}
        >
          {t("OverallHarvest")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "overallHarvest",
      key: "overallHarvest",
      width: `150px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.overallHarvest }}>
          {record?.overallHarvest}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("lastPrunedDate"),
          }}
        >
          {t("lastPrunedDate")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "lastPrunedDate",
      key: "lastPrunedDate",
      width: `200px`,
      render: (datetime_: any) => (
        <Typography.Text
          ellipsis={{ tooltip: moment(datetime_).format("DD.MM.YYYY") }}
        >
          {moment(datetime_).format("DD.MM.YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("IsFruiting"),
          }}
        >
          {t("IsFruiting")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "isFruiting",
      key: "isFruiting",
      width: `150px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.isFruiting }}>
          {record?.isFruiting ? t("Frukting") : t("NonFrukting")}
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
      render: (_: any, record: TTree) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditTree")));
            dispatch(setModalComponentType("tree"));
            dispatch(
              setTreeItemSendInfo({
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
        {/* <TreeModalComponent /> */}
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: treeSendInfo,
                  stateName: "treeSendInfo",
                  setState: (value: any) => dispatch(setTreeSendInfo(value)),
                },
                treeSelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddTree")));
                  dispatch(resetTreeItemSendInfo());
                  dispatch(setModalComponentType("tree"));
                  dispatch(setTreeItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [treeSendInfo]
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
              state: treeSendInfo,
              stateName: "treeSendInfo",
              setState: (value: any) => dispatch(setTreeSendInfo(value)),
            }),
            [treeSendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Trees;
