import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ServerError = ({
  height = "80vh",
  isSmall = false,
  error,
}: {
  height?: string;
  isSmall?: boolean;
  error?: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height,
      }}
    >
      <Result
        status={isSmall ? "warning" : "500"}
        subTitle={error}
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            {t("GoBack")}
          </Button>
        }
      />
    </div>
  );
};

export default ServerError;
