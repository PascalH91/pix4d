import React from "react";
import ReactDOM from "react-dom/client";

import templatePaths from "./json/paths.json";
import App from "./App";
import { getPathsFromCookies } from "./utils/helper";
import { Context as ContextType, PathInfo } from "./utils/types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const Context = React.createContext({} as ContextType);

const ContextProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) => {
  let decodedCookie = decodeURIComponent(document.cookie);
  const paths = getPathsFromCookies(decodedCookie);
  const [context, setContext] = React.useState<ContextType>({
    addedPaths: { ...(templatePaths as unknown as PathInfo), ...paths },
    selectedPathId: undefined,
  });
  return (
    //@ts-ignore
    <Context.Provider value={[context, setContext]}>
      {children}
    </Context.Provider>
  );
};

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
