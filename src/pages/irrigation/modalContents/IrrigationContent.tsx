/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import "leaflet/dist/leaflet.css";
import {
  Button,
  DatePicker,
  NotificationArgsProps,
  Select,
  notification,
} from "antd";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import Field from "../../../components/Field";
import { setIrrigationItemSendInfo } from "../../../store/irrigation/irrigationSlice";
import {
  useAddIrrigationMutation,
  useEditIrrigationMutation,
  useGetIrrigationQuery,
} from "../../../store/api/irrigation.api";
import Loader from "../../../components/Loader";
import { filterDataForEdit } from "../../../funtions";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useGetRowsQuery } from "../../../store/api/row.api";
import { TRow } from "../../../types/row";

type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

const IrrigationContent = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const irrigationItemSendInfo = useAppSelector(
    (state) => state.irrigation.irrigationItemSendInfo
  );

  const {
    currentData: rows = {
      result: [],
      dataCount: 0,
    },
    isLoading: rIsLoading,
    isFetching: rIsFetching,
  } = useGetRowsQuery({ offset: 0, limit: 30 });

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
        message: `${info.message}`,
        description: (
          <Context.Consumer>{() => `${info.description}!`}</Context.Consumer>
        ),
        placement: info.placement,
      });
    } else {
      api.success({
        message: `${info.message}`,
        description: (
          <Context.Consumer>{() => `${info.description}!`}</Context.Consumer>
        ),
        placement: info.placement,
      });
    }
  };

  const {
    currentData: irrigation = {},
    isLoading: irrigationIsLoading,
    isFetching: irrigationIsFetching,
  } = useGetIrrigationQuery(irrigationItemSendInfo?.id, {
    skip: !irrigationItemSendInfo?.id,
    refetchOnMountOrArgChange: true,
  });

  const [addIrrigation, { isSuccess, isError, error, isLoading }] =
    useAddIrrigationMutation();
  const [
    editIrrigation,
    {
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      isLoading: isLoadingEdit,
    },
  ] = useEditIrrigationMutation();

  useEffect(() => {
    if (isSuccess) {
      openNotification({
        placement: "bottomRight",
        message: t("Success"),
        description: t("AddedSuccessfully"),
        type: "success",
      });

      dispatch(setIsModalComponentOpen(false));
    }

    if (isError) {
      openNotification({
        placement: "bottomRight",
        message: t("Error"),
        description: (error as { data: { message: string } })?.data.message,
        type: "error",
      });
    }
    if (isSuccessEdit) {
      openNotification({
        placement: "bottomRight",
        message: t("Success"),
        description: t("EditedSuccessfully"),
        type: "success",
      });

      dispatch(setIsModalComponentOpen(false));
    }
  }, [isSuccess, isError, isSuccessEdit, isErrorEdit]);

  const handleSaveButton = async () => {
    if (irrigationItemSendInfo?.id) {
      await editIrrigation({
        id: irrigationItemSendInfo?.id,
        data: filterDataForEdit(
          { ...irrigation, rowIds: irrigation?.rowIds?.map((e: any) => e?.id) },
          {
            ...irrigationItemSendInfo,

            date:
              irrigationItemSendInfo?.date === null ||
              irrigationItemSendInfo?.date === undefined
                ? dayjs() // ?  undefied => dayjs()
                : dayjs(irrigationItemSendInfo["date"]),
          }
        ),
      });
    } else {
      await addIrrigation({
        ...irrigationItemSendInfo,

        date:
          irrigationItemSendInfo?.date === null ||
          irrigationItemSendInfo?.date === undefined
            ? dayjs() // ?  undefied => dayjs()
            : dayjs(irrigationItemSendInfo["date"]),
      });
    }
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return irrigationIsLoading || irrigationIsFetching ? (
    <Loader />
  ) : (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <Field label="Date">
        <DatePicker
          style={{ minWidth: "200px", width: "100%" }}
          value={
            irrigationItemSendInfo?.date === null ||
            irrigationItemSendInfo?.date === undefined
              ? dayjs() // ?  undefied => dayjs()
              : dayjs(irrigationItemSendInfo["date"])
          }
          onChange={(newValue) => {
            dispatch(
              setIrrigationItemSendInfo({
                ...irrigationItemSendInfo,
                date: newValue?.hour(12),
              })
            );
          }}
          disabledDate={(currentDate) =>
            (currentDate && currentDate.isBefore(dayjs("01.01.2000"))) ||
            currentDate.isAfter(dayjs())
          }
        />
      </Field>

      <Field label="Description" propStyles={{ marginTop: "10px" }}>
        <TextArea
          autoSize={{ minRows: 6, maxRows: 6 }}
          value={irrigationItemSendInfo?.note}
          onChange={(e) =>
            dispatch(
              setIrrigationItemSendInfo({
                ...irrigationItemSendInfo,
                note: e.target.value,
              })
            )
          }
        />
      </Field>

      <Field label="Rows" propStyles={{ marginTop: "10px" }}>
        <Select
          mode="tags"
          loading={rIsLoading || rIsFetching}
          style={{ width: "100%" }}
          onChange={(e) => {
            dispatch(
              setIrrigationItemSendInfo({
                ...irrigationItemSendInfo,
                rowIds: e,
              })
            );
          }}
          value={irrigationItemSendInfo?.rowIds}
          options={rows?.data?.map((e: TRow) => ({
            label: e.desc,
            value: e.id,
          }))}
        />
      </Field>

      <Button
        onClick={handleSaveButton}
        loading={isLoading || isLoadingEdit}
        style={{ float: "right", marginTop: "15px" }}
        type="primary"
      >
        {t("Save")}
      </Button>
    </Context.Provider>
  );
};

export default IrrigationContent;
