/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaLock, FaLockOpen } from "react-icons/fa";

type TProps = {
  children: any;
  label: string;
  isRequired?: boolean;
  propStyles?: any;
  actions?: {
    setDisabled?: any;
    disabled?: boolean;
  };
  mustFix?: boolean;
};
const Field = (props: TProps) => {
  const { t } = useTranslation();
  const {
    label,
    children,
    isRequired = true,
    propStyles = {},
    actions,
    mustFix = false,
  } = props;
  return (
    <div
      key={label}
      style={{
        ...propStyles,
      }}
    >
      <div>
        <div style={{ marginBottom: "5px" }}>
          <Typography.Text style={{ display: "flex", alignItems: "center" }}>
            {isRequired ? <span style={{ color: "red" }}>*</span> : ""}{" "}
            {t(label)}
            {mustFix && actions?.disabled && (
              <FaLock
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={actions?.setDisabled}
              />
            )}
            {mustFix && !actions?.disabled && (
              <FaLockOpen
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={actions?.setDisabled}
              />
            )}
          </Typography.Text>
        </div>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Field);
