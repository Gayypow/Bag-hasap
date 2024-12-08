import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import Cookies from "js-cookie";

const mutex = new Mutex();
// type TToken = {
//   accessToken: string;
//   refreshToken: string;
// };

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const dr_accessToken = Cookies.get("DR_AT") ?? "";
    const sanitizedToken = encodeURIComponent(dr_accessToken);
    if (dr_accessToken) {
      headers.set("Authorization", `Bearer ${sanitizedToken}`);
    }
    headers.set("Api-Version", "1");
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  const release = await mutex.acquire();

  // const dr_refreshToken = Cookies.get("DR_RT");
  // localStorage.setItem("activityDate", dayjs().toISOString());

  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   const credentials = { refreshToken: dr_refreshToken, platform: "web" };
  //   if (isProduction()) {
  //     var encryptedCredentials = await encryptBcRSAData(
  //       JSON.stringify(credentials)
  //     );
  //   }

  //   try {
  //     const refreshResult = await baseQuery(
  //       {
  //         url: "/auth/refresh",
  //         method: "POST",
  //         body: isProduction() ? { data: encryptedCredentials } : credentials,
  //       },
  //       api,
  //       extraOptions
  //     );

  //     if ("data" in refreshResult) {
  //       const { data } = refreshResult as { data: TToken };
  //       const { accessToken, refreshToken, aesKey } = data;

  //       setCookieWithMinutesExpiration("DR_AT", accessToken, 35);
  //       setCookieWithMinutesExpiration("DR_RT", refreshToken, 35);

  //       if (!unneedUrls.includes((args as any)?.url) && isProduction()) {
  //         const decryptedParams = await decryptData((args as any)?.body?.data);
  //         (args as any).body = JSON.parse(decryptedParams);
  //       }
  //       if (isProduction()) {
  //         try {
  //           await addKey(aesKey, aesKeyName);
  //         } catch (error) {
  //           await updateKey(aesKey, aesKeyName);
  //         }
  //         if (!unneedUrls.includes((args as any)?.url)) {
  //           const encryptedParams = await encryptData(
  //             JSON.stringify((args as any)?.body)
  //           );
  //           (args as any).body = { data: encryptedParams };
  //         }
  //       }

  //       result = await baseQuery(args, api, extraOptions);
  //     } else {
  //       if (
  //         ((refreshResult.error as any).originalStatus ??
  //           (refreshResult.error as any).status) === 409
  //       ) {
  //         Modal.warning({
  //           title: i18next.t("Attention"),
  //           content: i18next.t("TokenConflictModalContent"),
  //           onOk() {
  //             logout();
  //           },
  //         });
  //       }
  //     }
  //   } finally {
  //     release();
  //   }
  // }

  release();

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  refetchOnReconnect: true,
  tagTypes: [
    "Users",
    "User",
    "Rows",
    "Row",
    "Irrigations",
    "Irrigation",
    "Stats",
    "Categorys",
    "Category",
    "Trees",
    "Tree",
    "Harvests",
    "Harvest",
  ],
  endpoints: () => ({}),
});
