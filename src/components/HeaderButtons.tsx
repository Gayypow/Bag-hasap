/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./navbar/header.module.scss";
import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { TButtonObjProps } from "../types/generalType.ts";
import { useAppSelector } from "../store/hooks";
import { sessionSetter } from "../funtions";
const { Search } = Input;

// type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

function HeaderButtons({
  buttonsObj,
}: {
  buttonsObj: TButtonObjProps;
  renderedIn?: string;
}) {
  // const [api, contextHolder] = notification.useNotification();
  const {
    add,
    // save = { ...buttonsObj.save, showIcon: true },
    search,
    // excel = false,
  } = buttonsObj;
  const { t } = useTranslation();
  const localSendState = useAppSelector(
    (state) => state.general.localSendState
  );
  const { state, setState, stateName } = search?.states ?? {};
  const [tableSearchValue, setTableSearchValue] = useState<string>(
    state?.Search
  );
  const handleSearchInputChange = (e: any) => {
    setTableSearchValue(e.target.value);
  };

  useEffect(() => {
    setTableSearchValue(state?.keyword);
  }, [state]);

  const handleOkButton = () => {
    const tempSendInfo = { ...localSendState, ...state, offset: 0 };
    tempSendInfo.keyword = tableSearchValue;

    sessionSetter(`${stateName}`, JSON.stringify(tempSendInfo));
    setState(tempSendInfo);
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <>
      <Context.Provider value={contextValue}>
        {/* {contextHolder} */}
        <div className={styles["buttons"]}>
          {search?.display && (
            <Search
              placeholder={`${t("Search")}...`}
              onChange={handleSearchInputChange}
              onPressEnter={handleOkButton}
              onSearch={handleOkButton}
              value={tableSearchValue}
              style={{
                width: "250px",
              }}
              className={styles?.search}
            />
          )}
          {/* {excel && <ExcelExportModal />} */}

          {add?.display && (
            <>
              <Button
                type="primary"
                onClick={() => add?.function?.()}
                icon={<PlusOutlined />}
              >
                <p>{t(add?.name ?? "Add")}</p>
              </Button>
            </>
          )}
        </div>
      </Context.Provider>
    </>
  );
}
export default React.memo(HeaderButtons);
