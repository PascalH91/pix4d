import React from "react";

import { Context as ContextType } from "../utils/types";
import { Context } from "../index";
import ListItem from "./ListItem";

import "../Styles/components/routeList.css";

const RouteList = (): JSX.Element => {
  //@ts-ignore
  const [context, _]: [ContextType, any] = React.useContext(Context);

  return (
    <div className="RouteListWrapper">
      {Object.values(context.addedPaths)?.map((path) => (
        <ListItem key={path.id} path={path} />
      ))}
    </div>
  );
};

export default React.memo(RouteList);
