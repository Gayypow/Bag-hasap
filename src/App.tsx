import { FC, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import "./App.scss";
import "./plugins/reactI18n";

import ru from "antd/locale/ru_RU";
import en from "antd/locale/en_US";
import tk from "antd/locale/tk_TK";

import { useAppSelector } from "./store/hooks";
import Loader from "./components/Loader";
import Protected from "./pages/auth/Protected.tsx";
// import LoginPage from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";
import { PageRoutes } from "./Routes";
import LoginPage from "./pages/auth/Login.tsx";

const App: FC = () => {
  const language = useAppSelector((state) => state.general.language);
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  const themeConfig = {
    algorithm:
      appCustomization.theme === "dark"
        ? [theme.darkAlgorithm]
        : [theme.defaultAlgorithm],
    token: {
      borderRadius: appCustomization.borderRadius,
      colorPrimary: appCustomization.primaryColor,
      fontFamily: "Open Sans, sans-serif",
    },
    Table: {
      cellPaddingBlock: 0,
      cellPaddingInline: 1,
    },
    components: {
      Typography: {
        titleMarginTop: 0,
        titleMarginBottom: 0,
      },
      Menu: {
        darkItemBg: "undefined",
      },
    },
  };

  const currentLanguage = () => {
    if (localStorage.getItem("I18N_LANGUAGE") === "en") {
      return en;
    }
    if (localStorage.getItem("I18N_LANGUAGE") === "ru") {
      return ru;
    }
    if (localStorage.getItem("I18N_LANGUAGE") === "tk") {
      return tk;
    }
  };

  const [systemLanguage, setSystemLanguage] = useState(currentLanguage);

  useEffect(() => {
    setSystemLanguage(currentLanguage);
  }, [language]);

  return (
    <ConfigProvider locale={systemLanguage} theme={themeConfig}>
      <Routes>
        <Route
          path="/login"
          element={<Suspense fallback={<Loader />}>{<LoginPage />}</Suspense>}
        />
        <Route path="/" element={<Protected outlet={<MainLayout />} />}>
          {PageRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={route.element}
                key={`route-index-${index}`}
              />
            );
          })}
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
export default App;
