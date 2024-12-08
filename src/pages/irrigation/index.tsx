/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "antd";
import { useGetIrrigationsQuery } from "../../store/api/irrigation.api";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { sessionGetter } from "../../funtions";
import {
  resetIrrigationItemSendInfo,
  setIrrigationItemSendInfo,
  setIrrigationSendInfo,
} from "../../store/irrigation/irrigationSlice";
import {
  setBreadcrumbs,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setModalComponentType,
} from "../../store/general/generalSlice";
import Header from "../../components/navbar/Header";
import TableComponent from "../../components/tableComponent/TableComponent";
import { ColumnsType } from "antd/es/table";
import { TIrrigation } from "../../types/irrigation";
import IrrigationModalComponent from "./modalContents/IrrigationModalComponent";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const Context = React.createContext({ name: "Default" });

const Irrigations = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const irrigationSendInfo = useAppSelector(
    (state) => state.irrigation.irrigationSendInfo
  );
  const language = useAppSelector((state) => state.general.language);

  let tempSendInfo = {};
  const parseValue = sessionGetter("irrigationSendInfo");
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
  } = useGetIrrigationsQuery(
    { ...irrigationSendInfo, ...tempSendInfo },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispatch(setIrrigationSendInfo(tempSendInfo));
  }, []);

  //setting breadcrumbs
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Irrigations"),
          path: "/irrigations",
        },
      ])
    );
  }, [language]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnsType<TIrrigation> = [
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
      render: (_: any, record: TIrrigation, e: number) => {
        return (
          <Typography.Text
            ellipsis={{ tooltip: (irrigationSendInfo?.offset ?? 0) + e + 1 }}
            key={record.id}
          >
            {(irrigationSendInfo?.offset ?? 0) + e + 1}
          </Typography.Text>
        );
      },
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
      width: `150px`,
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
            tooltip: t("Note"),
          }}
        >
          {t("Note")}
        </Typography.Text>
      ),
      dataIndex: "note",
      onHeaderCell: () => ({
        style: { textAlign: "left" },
      }),
      onCell: () => ({
        style: { textAlign: "left" },
      }),
      key: "note",
      // width: `200px`,
      render: (_: any, record: TIrrigation) => (
        <Typography.Text ellipsis={{ tooltip: record?.note }}>
          {record?.note}
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
      render: (_: any, record: TIrrigation) => (
        <Button
          onClick={() => {
            dispatch(setModalComponentTitle(t("EditIrrigation")));
            dispatch(setModalComponentType("irrigation"));
            dispatch(
              setIrrigationItemSendInfo({
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
        <IrrigationModalComponent />
        <Header
          buttonsObj={useMemo(
            () => ({
              search: {
                display: true,
                states: {
                  state: irrigationSendInfo,
                  stateName: "irrigationSendInfo",
                  setState: (value: any) =>
                    dispatch(setIrrigationSendInfo(value)),
                },
                irrigationSelect: true,
              },
              add: {
                display: true,
                name: t("Add"),
                function: () => {
                  dispatch(setModalComponentTitle(t("AddIrrigation")));
                  dispatch(resetIrrigationItemSendInfo());
                  dispatch(setModalComponentType("irrigation"));
                  dispatch(setIrrigationItemSendInfo({}));
                  dispatch(setIsModalComponentOpen(true));
                },
              },
              excel: true,
            }),
            [irrigationSendInfo]
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
              state: irrigationSendInfo,
              stateName: "irrigationSendInfo",
              setState: (value: any) => dispatch(setIrrigationSendInfo(value)),
            }),
            [irrigationSendInfo]
          )}
        />
      </Context.Provider>
    </>
  );
};

export default Irrigations;
