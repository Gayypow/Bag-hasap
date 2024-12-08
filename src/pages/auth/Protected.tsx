import { useEffect, type FC } from "react";

import { Navigate } from "react-router-dom";

// import { setToken } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import Cookies from "js-cookie";
import { setToken } from "../../store/auth/authSlice";

export type TProps = {
  authPath?: string;
  outlet: JSX.Element;
};

const Protected: FC<TProps> = ({ authPath = "/login", outlet }) => {
  const dispatch = useAppDispatch();
  const token = Cookies.get("DR_AT");

  useEffect(() => {
    if (token) {
      dispatch(setToken(token ?? ""));
    }
  }, []);

  if (token) {
    return outlet;
  }
  return <Navigate to={{ pathname: authPath }} />;
};

export default Protected;
