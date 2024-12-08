/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "antd";
import { useGetHarvestsQuery } from "../../store/api/harvest.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetHarvestItemSendInfo,
  setHarvestItemSendInfo,
  setHarvestSendInfo,
} from "../../store/harvest/harvestSlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { THarvest } from "../../types/harvest";
// import HarvestModalComponent from "./modalContents/HarvestModalComponent";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const Context = React.createContext({ name: "Default" });

const Harvests = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const harvestSendInfo = useAppSelector(
    (state) => state.harvest.harvestSendInfo
  );
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("harvestSendInfo");
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
  } = useGetHarvestsQuery(
    { ...harvestSendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setHarvestSendInfo(tempSendInfo));
  }, []);

  //setting breadcrumbs
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Harvests"),
          path: "/harvests",
        },
      ])
    );
  }, [language]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnsType<THarvest> = [
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
      render: (_: any, record: THarvest, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (harvestSendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(harvestSendInfo?.offset ?? 0) + e + 1}
          </Typography.Text>
        );
      },
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
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      dataIndex: "note",
      key: "note",
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
            tooltip: t("quantity"),
          }}
        >
          {t("quantity")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "quantity",
      key: "quantity",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.quantity }}>
          {record?.quantity}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("quality"),
          }}
        >
          {t("quality")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "quality",
      key: "quality",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.quality }}>
          {record?.quality}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("currency"),
          }}
        >
          {t("currency")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "currency",
      key: "currency",
      width: `200px`,
      render: (_, record: any) => (
        <Typography.Text ellipsis={{ tooltip: record?.currency }}>
          {record?.currency}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("Date"),
          }}
        >
          {t("Date")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "date",
      key: "date",
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
      render: (_: any, record: THarvest) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditHarvest")));
            dispatch(setModalComponentType("harvest"));
            dispatch(
              setHarvestItemSendInfo({
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
        {/* <HarvestModalComponent /> */}
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: harvestSendInfo,
                  stateName: "harvestSendInfo",
                  setState: (value: any) => dispatch(setHarvestSendInfo(value)),
                },
                harvestSelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddHarvest")));
                  dispatch(resetHarvestItemSendInfo());
                  dispatch(setModalComponentType("harvest"));
                  dispatch(setHarvestItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [harvestSendInfo]
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
              state: harvestSendInfo,
              stateName: "harvestSendInfo",
              setState: (value: any) => dispatch(setHarvestSendInfo(value)),
            }),
            [harvestSendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Harvests;
