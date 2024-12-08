import React, { Suspense } from "react";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetIrrigationItemSendInfo } from "../../../store/irrigation/irrigationSlice";
import Loader from "../../../components/Loader";
import IrrigationContent from "./IrrigationContent";

const IrrigationModalComponent = () => {
  const modalComponentType = useAppSelector(
    (state) => state.general.modalComponentType
  );
  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      isMinimizable={false}
      maxHeidht={700}
      width={600}
      closeFunction={() => {
        dispatch(resetIrrigationItemSendInfo());
        dispatch(setIsModalComponentOpen(false));
      }}
    >
      <Suspense fallback={<Loader height="401px" />}>
        {modalComponentType === "irrigation" && <IrrigationContent />}
      </Suspense>
    </ModalComponent>
  );
};

export default React.memo(IrrigationModalComponent);
