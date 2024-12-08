/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Input,
  NotificationArgsProps,
  Select,
  Switch,
  notification,
} from "antd";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import Field from "../../../components/Field";
import { setUserItemSendInfo } from "../../../store/user/userSlice";
import {
  useAddUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "../../../store/api/user.api";
import Loader from "../../../components/Loader";
import { filterDataForEdit } from "../../../funtions";

type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

const UserContent = () => {
  const [api, contextHolder] = notification.useNotification();

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  //global states
  // const isModalComponentOpen = useAppSelector(
  //   (state) => state.general.isModalComponentOpen
  // );
  const userItemSendInfo = useAppSelector(
    (state) => state.user.userItemSendInfo
  );

  const {
    currentData: user = {},
    isLoading: userIsLoading,
    isFetching: userIsFetching,
  } = useGetUserQuery(userItemSendInfo?.id, {
    skip: !userItemSendInfo?.id,
    refetchOnMountOrArgChange: true,
  });

  const [addUser, { isSuccess, isError, error, isLoading }] =
    useAddUserMutation();
  const [
    editUser,
    {
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      isLoading: isLoadingEdit,
    },
  ] = useEditUserMutation();
  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(setUserItemSendInfo(user));
  //   }
  // }, [user]);

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
    if (userItemSendInfo?.id) {
      await editUser({
        id: userItemSendInfo?.id,
        data: filterDataForEdit(user, userItemSendInfo),
      });
    } else {
      await addUser(filterDataForEdit(user, userItemSendInfo));
    }
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return userIsLoading || userIsFetching ? (
    <Loader />
  ) : (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <Field label="UserName">
        <Input
          value={userItemSendInfo?.username}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                username: e.target.value,
              })
            )
          }
        />
      </Field>

      <Field label="FullName" propStyles={{ marginTop: "10px" }}>
        <Input
          value={userItemSendInfo?.fullName}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                fullName: e.target.value,
              })
            )
          }
        />
      </Field>

      <Field label="Role" propStyles={{ marginTop: "10px" }}>
        <Select
          style={{ width: "100%" }}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                role: e,
              })
            )
          }
          value={userItemSendInfo?.role}
          options={[
            {
              label: "admin",
              value: "admin",
            },
            {
              label: "gardener",
              value: "gardener",
            },
            {
              label: "agronomist",
              value: "agronomist",
            },
          ]}
        />
      </Field>

      <Field label="Contact" propStyles={{ marginTop: "10px" }}>
        <Input
          value={userItemSendInfo?.contact}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                contact: e.target.value,
              })
            )
          }
        />
      </Field>

      <Field label="Password" propStyles={{ marginTop: "10px" }}>
        <Input.Password
          value={userItemSendInfo?.password}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                password: e.target.value,
              })
            )
          }
        />
      </Field>

      <Field label="Status" propStyles={{ marginTop: "10px" }}>
        <Switch
          value={userItemSendInfo?.isActive}
          onChange={(e) =>
            dispatch(
              setUserItemSendInfo({
                ...userItemSendInfo,
                isActive: e,
              })
            )
          }
        />
      </Field>
      <Button
        onClick={handleSaveButton}
        loading={isLoading || isLoadingEdit}
        style={{ float: "right" }}
        type="primary"
      >
        {t("Save")}
      </Button>
    </Context.Provider>
  );
};

export default UserContent;
