import { Select, Typography } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import React from "react";
import { setLanguage } from "../store/general/generalSlice";
import { useAppDispatch } from "../store/hooks";
const StyledDiv = styled("div")`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const { Option } = Select;
const LanguageSelect: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    dispatch(setLanguage(value));
    localStorage.setItem("I18N_LANGUAGE", value);
  };
  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      style={{ width: "120px" }} // Adjust the width as needed
    >
      {[
        {
          label: "Türkmençe",
          key: "tk",
          code: "tk",
        },
        {
          label: "English",
          key: "en",
          code: "en",
        },
        {
          label: "Русский",
          key: "ru",
          code: "ru",
        },
      ]?.map((item: { label: string; key: string; code: string }) => (
        <Option key={item.key} value={item.code}>
          <StyledDiv>
            <Typography.Paragraph style={{ marginBottom: "0" }}>
              {t(item.label)}
            </Typography.Paragraph>
          </StyledDiv>
        </Option>
      ))}
    </Select>
  );
};
export default React.memo(LanguageSelect);
