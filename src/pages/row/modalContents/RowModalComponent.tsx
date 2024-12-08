import React, { Suspense } from "react";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetRowItemSendInfo } from "../../../store/row/rowSlice";
import Loader from "../../../components/Loader";
import RowContent from "./RowContent";

const RowModalComponent = () => {
  const modalComponentType = useAppSelector(
    (state) => state.general.modalComponentType
  );
  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      isMinimizable={false}
      maxHeidht={700}
      width={1300}
      closeFunction={() => {
        dispatch(resetRowItemSendInfo());
        dispatch(setIsModalComponentOpen(false));
      }}
    >
      <Suspense fallback={<Loader height="401px" />}>
        {modalComponentType === "row" && <RowContent />}
      </Suspense>
    </ModalComponent>
  );
};

export default React.memo(RowModalComponent);
