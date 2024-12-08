import { AgCharts } from "ag-charts-react";
import { Typography } from "antd";
import { useAppSelector } from "../store/hooks";

const { Paragraph } = Typography;

const ChartComp = ({
  options = [],
  xKey = "office",
  yKey = "value_number",
  type = "line",
  title = "",
}) => {
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "13px",
        overflow: "hidden",
        display: "flex",
        height: "390px",
        flexDirection: "column",
      }}
    >
      <Paragraph
        style={{
          background: "#2e7d32",
          margin: "0",
          padding: "8px 12px",
          color: "#fff",
        }}
      >
        {title}
      </Paragraph>
      <AgCharts
        options={{
          data: options,
          theme:
            appCustomization.theme === "dark" ? "ag-vivid-dark" : "ag-default",
          series: [
            {
              type,
              xKey,
              yKey,
              label: {
                // formatter: ({ value }) => formatNumber(value),
                formatter: ({ value }) => String(parseInt(value)),
                color: appCustomization.theme === "dark" ? "#fff" : "#000",
              },
            },
          ],
        }}
        style={{ height: "400px" }}
      />
    </div>
  );
};
export default ChartComp;
