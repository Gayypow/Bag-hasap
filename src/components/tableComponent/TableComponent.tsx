/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { TablePaginationConfig } from "antd/lib";
// import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { TTableResponse } from "../../types/response";
import { sessionSetter } from "../../funtions";
import Loader from "../Loader";
import ServerError from "../ServerError";
type ColumnDataType = Record<string, any>;
type TProps = {
  add?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  download?: {
    display: boolean;
    function?: any;
    title?: string;
  };
  search?: boolean;
};
export type TableComponentProps<T extends ColumnDataType> = {
  isPaginated?: boolean;
  states: {
    state: any;
    stateName: string;
    setState: any;
  };
  columns: ColumnsType<T>;
  data: {
    data: TTableResponse | never[];
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    isEnd?: boolean;
    isUninitialized?: boolean;
  };
  add?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  search?: boolean;
  buttonsObj?: TProps;
  renderedIn?: string;
  height?: string;
  withTitle?: boolean;
};

function TableComponent<T extends ColumnDataType>(
  props: TableComponentProps<T>
) {
  // const { t } = useTranslation();

  const { columns, data, height, states, isPaginated = true } = props;

  const { state, setState, stateName } = states;

  const onTableChange = (pagination: TablePaginationConfig) => {
    if (!pagination.current) pagination.current = 1;
    if (!pagination.pageSize) pagination.pageSize = 20;

    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    const params = { ...state };
    params.offset = offset;
    params.limit = limit;
    sessionSetter(stateName, JSON.stringify(params));
    setState(params);
  };

  return (
    <div
      style={{
        width: "100%",
        // overflowX: "auto",
        padding: "5px 10px 0",
        margin: "0 auto",
      }}
    >
      {data?.isLoading || data?.isFetching ? (
        <Loader />
      ) : data?.isError ? (
        <ServerError
          error={(data.error as { data: { message: string } })?.data.message}
        />
      ) : (
        <>
          <>
            <Table
              onChange={isPaginated ? onTableChange : undefined}
              pagination={
                isPaginated
                  ? {
                      total: (data.data as TTableResponse).count,
                      showSizeChanger: false,
                      showQuickJumper: true,
                      size: "small",
                      hideOnSinglePage: true,
                      defaultPageSize: state?.limit ?? 20,
                      current: (state?.offset ?? 0) / (state?.limit ?? 20) + 1,
                    }
                  : false
              }
              id="table"
              loading={data.isLoading || data?.isFetching}
              bordered={true}
              columns={columns}
              dataSource={(data.data as TTableResponse).data}
              scroll={{
                y: height ? height : `calc(100vh - ${"240px"})`,
                scrollToFirstRowOnChange: true,
              }}
              rowKey={() => {
                const customUUID = uuidv4();
                return customUUID;
              }}
              tableLayout="fixed"
            />
          </>
        </>
      )}
    </div>
  );
}
export default React.memo(TableComponent);
