/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button, Divider, Modal, Typography } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsMinimized,
  setIsModalComponentOpen,
} from "../../store/general/generalSlice";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";

type TProps = {
  children: any;
  closeFunction: any;
  isMinimizable?: boolean;
  width?: number;
  maxHeidht?: number;
  withTitle?: boolean;
};

const ModalComponent = (props: TProps) => {
  const {
    children,
    closeFunction,
    isMinimizable = true,
    withTitle = true,
    width = 800,
    maxHeidht = 500,
  } = props;
  const dispatch = useAppDispatch();
  const isModalComponentOpen = useAppSelector(
    (state) => state.general.isModalComponentOpen
  );
  const modalComponentTitle = useAppSelector(
    (state) => state.general.modalComponentTitle
  );
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleOk = () => {
    dispatch(setIsModalComponentOpen(false));
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        closable={false}
        maskClosable={false}
        width={width}
        styles={{
          body: {
            maxHeight: `${maxHeidht}px`,
            overflow: "auto",
          },
        }}
        footer={null}
        title={
          withTitle ? (
            <div
              style={{
                width: "100%",
                cursor: "move",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
            >
              <Typography.Title level={4}>
                {modalComponentTitle} :
              </Typography.Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                {isMinimizable && (
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => {
                      dispatch(setIsMinimized(true));
                      dispatch(setIsModalComponentOpen(false));
                    }}
                  />
                )}
                <Button
                  type="text"
                  icon={<CloseOutlined style={{ fontSize: "18px" }} />}
                  onClick={closeFunction}
                />
              </div>
            </div>
          ) : null
        }
        open={isModalComponentOpen}
        onOk={handleOk}
        // onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {withTitle && <Divider style={{ margin: "0 0 10px" }} />}
        {children}
      </Modal>
    </>
  );
};

export default React.memo(ModalComponent);
