/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import ChartComp from "../../components/ChartComponent";
import Loader from "../../components/Loader";
import { useGetStatsQuery } from "../../store/api/stats";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const language = useAppSelector((state) => state.general.language);

  const {
    currentData: data = {
      result: [],
      dataCount: 0,
    },
    isLoading,
    isFetching,
  } = useGetStatsQuery({});

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: t("Dashboard"),
          path: "/",
        },
      ])
    );
  }, [language]);

  return (
    <div style={{ margin: "20px auto", width: "98%" }}>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ChartComp
                type="bar"
                options={data?.irrigations}
                xKey="year"
                yKey="number"
                title={t("IrragationsPerYear")}
              />
            </Col>
            <Col span={12}>
              <ChartComp
                options={data?.harvests}
                xKey="year"
                yKey="number"
                title={t("HarvestsPerYear")}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
            <Col span={12}>
              <ChartComp
                type="area"
                options={data?.trees}
                xKey="year"
                yKey="number"
                title={t("TreesPerYear")}
              />
            </Col>
            <Col span={12}>
              <ChartComp
                type="bar"
                options={data?.categories}
                xKey="name"
                yKey="number"
                title={t("CategoriesPerYear")}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
