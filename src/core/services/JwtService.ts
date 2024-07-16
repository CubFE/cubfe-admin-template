const ID_TOKEN_KEY = "id_token" as string;
const ID_USER_KEY = "bmsoft_user" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const getUser = (): string | null => {
  return window.localStorage.getItem(ID_USER_KEY);
};

export const saveUser = (userInfoJsonStr: string) => {
  window.localStorage.setItem(ID_USER_KEY, userInfoJsonStr);
};

export const destroyUser = (): void => {
  window.localStorage.removeItem(ID_USER_KEY);
};

export const getDynamicRoutes = (): string | null => {
  return window.localStorage.getItem("dynamicRoutes");
};
export const saveDynamicRoutes = (permissions: string) => {
  window.localStorage.setItem("dynamicRoutes", permissions);
};
export const destroyDynamicRoutes = (): void => {
  window.localStorage.removeItem("dynamicRoutes");
}
export default { getToken, saveToken, destroyToken, getUser, saveUser, destroyUser, getDynamicRoutes, saveDynamicRoutes, destroyDynamicRoutes };
