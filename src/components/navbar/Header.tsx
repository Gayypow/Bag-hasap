/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { Typography } from "antd";

import HeaderButtons from "../HeaderButtons";

import styles from "./header.module.scss";

import { TButtonObjProps } from "../../types/generalType.ts";
import { useAppSelector } from "../../store/hooks";
// import { useTranslation } from "react-i18next";

const { Title } = Typography;

const Header = ({ buttonsObj }: { buttonsObj: TButtonObjProps }) => {
  // const { t } = useTranslation();
  const language = useAppSelector((state) => state.general.language);
  const breadcrumbs = useAppSelector((state) => state.general.breadcrumbs);

  const { isTitleDisplay = true, padding = "10px" } = buttonsObj;
  // const { state, setState, stateName } = search?.states ?? {};

  const heading = useCallback(() => {
    const headerTranslation = breadcrumbs[breadcrumbs?.length - 1]?.title;
    return <Title level={3}>{headerTranslation}</Title>;
  }, [language, breadcrumbs]);

  return (
    <div className={styles["header"]} style={{ userSelect: "none" }}>
      <div className={styles["header-bottom"]} style={{ padding: padding }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {isTitleDisplay && (
            <div className={styles["header-middle"]}>{heading()}</div>
          )}

          {/* {rangePicker && (
            <DatePicker.RangePicker
              value={[
                stateInfo?.state?.BeginDate === null ||
                stateInfo?.state?.BeginDate === undefined
                  ? undefined
                  : dayjs(stateInfo?.state?.BeginDate),
                stateInfo?.state?.EndDate === null ||
                stateInfo?.state?.EndDate === undefined
                  ? undefined
                  : dayjs(stateInfo?.state?.EndDate),
              ]}
              format={dateFormat}
              onChange={(e) => {
                const tempSendInfo = {
                  ...stateInfo?.state,
                  BeginDate: e?.[0]?.format("YYYY-MM-DD"),
                  EndDate: e?.[1]?.format("YYYY-MM-DD"),
                  Offset: 0,
                };

                sessionSetter(
                  `${stateInfo?.stateName}`,
                  JSON.stringify(tempSendInfo)
                );
                stateInfo?.setState(tempSendInfo);
              }}
            />
          )} */}
        </div>
        <HeaderButtons buttonsObj={buttonsObj} />
      </div>
    </div>
  );
};
export default React.memo(Header);
