/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "antd";
import { useGetRowsQuery } from "../../store/api/row.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetRowItemSendInfo,
  setRowItemSendInfo,
  setRowSendInfo,
} from "../../store/row/rowSlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { TRow } from "../../types/row";
import RowModalComponent from "./modalContents/RowModalComponent";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const Context = React.createContext({ name: "Default" });

const Rows = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const rowSendInfo = useAppSelector((state) => state.row.rowSendInfo);
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("rowSendInfo");
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
  } = useGetRowsQuery(
    { ...rowSendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setRowSendInfo(tempSendInfo));
  }, []);

  //setting breadcrumbs
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Rows"),
          path: "/rows",
        },
      ])
    );
  }, [language]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnsType<TRow> = [
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
      render: (_: any, record: TRow, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (rowSendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(rowSendInfo?.offset ?? 0) + e + 1}
          </Typography.Text>
        );
      },
    },

    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("LastIrrigationDate"),
          }}
        >
          {t("LastIrrigationDate")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "lastIrrigationDate",
      key: "lastIrrigationDate",
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
            tooltip: t("Description"),
          }}
        >
          {t("Description")}
        </Typography.Text>
      ),
      dataIndex: "desc",
      onHeaderCell: () => ({
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      key: "desc",
      // width: `200px`,
      render: (_: any, record: TRow) => (
        <Typography.Text ellipsis={{ tooltip: record?.desc }}>
          {record?.desc}
        </Typography.Text>
      ),
    },

    {
      title: (
        <Typography.Text
          ellipsis={{
            tooltip: t("CreatedAt"),
          }}
        >
          {t("CreatedAt")}
        </Typography.Text>
      ),
      onHeaderCell: () => ({
        style: { textAlign: "center" },
      }),
      onCell: () => ({
        style: { textAlign: "center" },
      }),
      dataIndex: "createdAt",
      key: "createdAt",
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
      render: (_: any, record: TRow) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditRow")));
            dispatch(setModalComponentType("row"));
            dispatch(
              setRowItemSendInfo({
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
        <RowModalComponent />
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: rowSendInfo,
                  stateName: "rowSendInfo",
                  setState: (value: any) => dispatch(setRowSendInfo(value)),
                },
                rowSelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddRow")));
                  dispatch(resetRowItemSendInfo());
                  dispatch(setModalComponentType("row"));
                  dispatch(setRowItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [rowSendInfo]
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
              state: rowSendInfo,
              stateName: "rowSendInfo",
              setState: (value: any) => dispatch(setRowSendInfo(value)),
            }),
            [rowSendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Rows;
