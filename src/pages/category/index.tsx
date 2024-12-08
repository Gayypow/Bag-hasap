/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image, Spin, Typography } from "antd";
import { useGetCategorysQuery } from "../../store/api/category.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetCategoryItemSendInfo,
  setCategoryItemSendInfo,
  setCategorySendInfo,
} from "../../store/category/categorySlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { TCategory } from "../../types/category";
// import CategoryModalComponent from "./modalContents/CategoryModalComponent";
import { EditOutlined } from "@ant-design/icons";
import noImage from "../../assets/no-image.png";

const Context = React.createContext({ name: "Default" });

const Categorys = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const categorySendInfo = useAppSelector(
    (state) => state.category.categorySendInfo
  );
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("categorySendInfo");
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
  } = useGetCategorysQuery(
    { ...categorySendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setCategorySendInfo(tempSendInfo));
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

  const columns: ColumnsType<TCategory> = [
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
      render: (_: any, record: TCategory, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (categorySendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(categorySendInfo?.offset ?? 0) + e + 1}
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
      key: "image",
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
            tooltip: t("Name"),
          }}
        >
          {t("Name")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "name",
      key: "name",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.nameTm }}>
          {record?.nameTm}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Description"),
          }}
        >
          {t("Description")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "descTm",
      key: "descTm",
      // width: `300px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.descTm }}>
          {record?.descTm}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("HarvestAmount"),
          }}
        >
          {t("HarvestAmount")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "harvestAmount",
      key: "harvestAmount",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.harvestAmount }}>
          {record?.harvestAmount}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("HarvestTime"),
          }}
        >
          {t("HarvestTime")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "harvestTime",
      key: "harvestTime",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.harvestTime }}>
          {record?.harvestTime}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("TreeCount"),
          }}
        >
          {t("TreeCount")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "treeCount",
      key: "treeCount",
      width: `150px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.treeCount }}>
          {record?.treeCount}
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
      width: `100px`,
      render: (_: any, record: TCategory) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditCategory")));
            dispatch(setModalComponentType("category"));
            dispatch(
              setCategoryItemSendInfo({
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
        {/* <CategoryModalComponent /> */}
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: categorySendInfo,
                  stateName: "categorySendInfo",
                  setState: (value: any) =>
                    dispatch(setCategorySendInfo(value)),
                },
                categorySelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddCategory")));
                  dispatch(resetCategoryItemSendInfo());
                  dispatch(setModalComponentType("category"));
                  dispatch(setCategoryItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [categorySendInfo]
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
              state: categorySendInfo,
              stateName: "categorySendInfo",
              setState: (value: any) => dispatch(setCategorySendInfo(value)),
            }),
            [categorySendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Categorys;
