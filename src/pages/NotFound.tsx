import React from "react";
import { styled } from "styled-components";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const StyledDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
`;

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <StyledDiv>
      <Result
        status="404"
        title="404"
        subTitle="Page not found"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {t("Home")}
          </Button>
        }
      />
    </StyledDiv>
  );
}

export default React.memo(NotFound);
