/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const Users = lazy(() => import("./pages/user"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Rows = lazy(() => import("./pages/row"));
const Irrigations = lazy(() => import("./pages/irrigation"));
const Categorys = lazy(() => import("./pages/category"));
const Trees = lazy(() => import("./pages/tree"));
const Harvests = lazy(() => import("./pages/harvest"));

type TRoute = {
  path: string;
  element: JSX.Element;
};

export const PageRoutes: TRoute[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/rows",
    element: <Rows />,
  },
  {
    path: "/irrigations",
    element: <Irrigations />,
  },
  {
    path: "/categories",
    element: <Categorys />,
  },
  {
    path: "/trees",
    element: <Trees />,
  },
  {
    path: "/harvests",
    element: <Harvests />,
  },
  { path: "*", element: <NotFound /> },
];
