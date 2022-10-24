import { v4 as uuid } from "uuid";

import { PathInfo, Path } from "../utils/types";

export const getPathsFromCookies = (cookieString: string): PathInfo => {
  let allCookies = cookieString.split(" ");
  const savedPaths = allCookies.reduce((acc, cookie) => {
    const match = cookie.match(/^pix4d_path[(0-9)|(a-z)|(A-Z)|-]+=/);
    if (match) {
      const cValueRaw = cookie.split(match[0])[1];
      const valueMatchCheck = cValueRaw.match(/^\{\"id"(.)+\}\}/);
      const valueMatchSuccess =
        valueMatchCheck && JSON.parse(valueMatchCheck[0]);
      if (valueMatchSuccess) {
        acc[valueMatchSuccess.id] = valueMatchSuccess;
      }
    }
    return acc;
  }, {} as PathInfo);

  return savedPaths;
};
export const writePathToCookies = (pathData: Path): Path => {
  const pathId = `pix4d_path${uuid()}`;
  const pathInfo = {
    id: pathId,
    date: pathData.date,
    path: pathData.path,
    mapSettings: pathData.mapSettings,
  };
  document.cookie = `${pathId}=${JSON.stringify(pathInfo)};`;
  return pathInfo;
};
