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
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import Field from "../../../components/Field";
import { setRowItemSendInfo } from "../../../store/row/rowSlice";
import {
  useAddRowMutation,
  useEditRowMutation,
  useGetRowQuery,
} from "../../../store/api/row.api";
import Loader from "../../../components/Loader";
import { filterDataForEdit } from "../../../funtions";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Map, Placemark, Polyline, YMaps } from "@pbe/react-yandex-maps";
import { useGetUsersQuery } from "../../../store/api/user.api";
import { TUser } from "../../../types/user";

type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

const RowContent = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const rowItemSendInfo = useAppSelector((state) => state.row.rowItemSendInfo);

  const [locations, setLocations] = useState<[number, number][]>([]);
  const [rectangleCorners, setRectangleCorners] = useState<[number, number][]>(
    []
  );

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");

    // Add locations (only two points are needed for the rectangle)
    if (locations.length < 2) {
      setLocations((prevLocations) => [...prevLocations, coords]);
      console.log(coords);
    }
  };

  // Function to handle the removal of a selected location
  const handleLocationRemove = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1); // Remove location by index
    setLocations(newLocations); // Update locations state
  };

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

  //global states
  // const isModalComponentOpen = useAppSelector(
  //   (state) => state.general.isModalComponentOpen
  // );

  const {
    currentData: row = {},
    isLoading: rowIsLoading,
    isFetching: rowIsFetching,
  } = useGetRowQuery(rowItemSendInfo?.id, {
    skip: !rowItemSendInfo?.id,
    refetchOnMountOrArgChange: true,
  });

  const {
    currentData: gardeners = {
      result: [],
      dataCount: 0,
    },
    isLoading: gIsLoading,
    isFetching: gIsFetching,
  } = useGetUsersQuery({ offset: 0, limit: 20 });

  const [addRow, { isSuccess, isError, error, isLoading }] =
    useAddRowMutation();
  const [
    editRow,
    {
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      isLoading: isLoadingEdit,
    },
  ] = useEditRowMutation();

  useEffect(() => {
    if (row.geoData?.length === 2) {
      setLocations([
        [row.geoData.startX, row.geoData.startY],
        [row.geoData.endX, row.geoData.endY],
      ]);
    }
  }, [row]);

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

  useEffect(() => {
    if (locations.length === 2 && rectangleCorners?.length !== 4) {
      const [loc1, loc2] = locations;

      // Calculate the other two corners of the rectangle
      const corner3: [number, number] = [loc1[0], loc2[1]]; // Same latitude as loc1, longitude as loc2
      const corner4: [number, number] = [loc2[0], loc1[1]]; // Same latitude as loc2, longitude as loc1

      // Set rectangle corners
      setRectangleCorners([loc1, corner3, loc2, corner4, loc1]); // Include loc1 to close the rectangle
    } else {
      setRectangleCorners([]); // Clear rectangle if there are fewer than 2 locations
    }
  }, [locations]);

  const handleSaveButton = async () => {
    if (locations?.length === 2) {
      if (rowItemSendInfo?.id) {
        await editRow({
          id: rowItemSendInfo?.id,
          data: filterDataForEdit(
            { ...row, gardernerId: row?.gardener?.id },
            {
              ...rowItemSendInfo,
              geoData: {
                startX: locations[0][0],
                startY: locations[0][1],
                endX: locations[1][0],
                endY: locations[1][1],
              },
              lastIrrigationDate:
                rowItemSendInfo?.lastIrrigationDate === null ||
                rowItemSendInfo?.lastIrrigationDate === undefined
                  ? dayjs() // ?  undefied => dayjs()
                  : dayjs(rowItemSendInfo["lastIrrigationDate"]),
            }
          ),
        });
      } else {
        await addRow({
          ...rowItemSendInfo,
          geoData: {
            startX: locations[0][0],
            startY: locations[0][1],
            endX: locations[1][0],
            endY: locations[1][1],
          },
          lastIrrigationDate:
            rowItemSendInfo?.lastIrrigationDate === null ||
            rowItemSendInfo?.lastIrrigationDate === undefined
              ? dayjs() // ?  undefied => dayjs()
              : dayjs(rowItemSendInfo["lastIrrigationDate"]),
        });
      }
    } else {
      openNotification({
        placement: "bottomRight",
        message: t("Error"),
        description: "Locate places",
        type: "error",
      });
    }
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  console.log("-----------", rowItemSendInfo);
  return rowIsLoading || rowIsFetching ? (
    <Loader />
  ) : (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "30%" }}>
          <Field label="Gardener">
            <Select
              loading={gIsLoading || gIsFetching}
              style={{ width: "100%" }}
              onChange={(e) => {
                dispatch(
                  setRowItemSendInfo({
                    ...rowItemSendInfo,
                    gardenerId: e,
                  })
                );
              }}
              value={rowItemSendInfo?.gardenerId}
              options={gardeners?.data?.map((e: TUser) => ({
                label: e.username,
                value: e.id,
              }))}
            />
          </Field>

          <Field label="LastIrrigationDate" propStyles={{ marginTop: "10px" }}>
            <DatePicker
              style={{ minWidth: "200px", width: "100%" }}
              value={
                rowItemSendInfo?.lastIrrigationDate === null ||
                rowItemSendInfo?.lastIrrigationDate === undefined
                  ? dayjs() // ?  undefied => dayjs()
                  : dayjs(rowItemSendInfo["lastIrrigationDate"])
              }
              onChange={(newValue) => {
                dispatch(
                  setRowItemSendInfo({
                    ...rowItemSendInfo,
                    lastIrrigationDate: newValue?.hour(12),
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
              autoSize={{ minRows: 14.8, maxRows: 14.8 }}
              value={rowItemSendInfo?.desc}
              onChange={(e) =>
                dispatch(
                  setRowItemSendInfo({
                    ...rowItemSendInfo,
                    desc: e.target.value,
                  })
                )
              }
            />
          </Field>
        </div>
        <div style={{ width: "69%" }}>
          <YMaps>
            <Map
              style={{ width: "100%", height: "500px" }}
              defaultState={{
                center: [55.674, 37.601],
                zoom: 11,
              }}
              onClick={handleMapClick}
            >
              {locations.map((loc, index) => (
                <Placemark
                  key={`selected-${index}`}
                  geometry={loc}
                  properties={{
                    hintContent: `Selected Location ${index + 1}`,
                    balloonContent: `Selected Location ${
                      index + 1
                    }: [${loc[0].toFixed(5)}, ${loc[1].toFixed(5)}]`,
                  }}
                  options={{
                    iconColor: "blue",
                  }}
                  onClick={(e: any) => {
                    e.preventDefault(); // Prevent map click behavior
                    handleLocationRemove(index);
                  }}
                />
              ))}

              {/* Render Rectangle Corners */}
              {rectangleCorners.map((corner, index) => (
                <Placemark
                  key={`corner-${index}`}
                  geometry={corner}
                  properties={{
                    hintContent: `Rectangle Corner ${index + 1}`,
                    balloonContent: `Rectangle Corner ${
                      index + 1
                    }: [${corner[0].toFixed(5)}, ${corner[1].toFixed(5)}]`,
                  }}
                  options={{
                    iconColor: "green",
                  }}
                  // Prevent removal when clicking on rectangle corners
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleLocationRemove(e);
                  }}
                />
              ))}

              {/* Render Rectangle Outline */}
              {rectangleCorners.length === 5 && (
                <Polyline
                  geometry={rectangleCorners} // Path that connects the rectangle corners
                  options={{
                    strokeColor: "#0000FF",
                    strokeWidth: 2,
                    strokeOpacity: 0.5,
                  }}
                />
              )}
            </Map>
          </YMaps>
        </div>
      </div>
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

export default RowContent;
