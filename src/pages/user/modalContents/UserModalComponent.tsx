import React, { Suspense } from "react";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import { setIsModalComponentOpen } from "../../../store/general/generalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetUserItemSendInfo } from "../../../store/user/userSlice";
import Loader from "../../../components/Loader";
import UserContent from "./UserContent";

const UserModalComponent = () => {
  const userItemSendInfo = useAppSelector(
    (state) => state.user.userItemSendInfo
  );
  const modalComponentType = useAppSelector(
    (state) => state.general.modalComponentType
  );
  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      isMinimizable={false}
      maxHeidht={600}
      width={500}
      closeFunction={() => {
        dispatch(resetUserItemSendInfo());
        dispatch(setIsModalComponentOpen(false));
      }}
    >
      <Suspense fallback={<Loader height="401px" />}>
        {modalComponentType === "user" && <UserContent />}
      </Suspense>
    </ModalComponent>
  );
};

export default React.memo(UserModalComponent);
