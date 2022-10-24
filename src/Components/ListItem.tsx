import React from "react";
import { format } from "date-fns";
import { Button, IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

import { Path, Context as ContextType } from "../utils/types";
import { Context } from "../index";
import CanvasMap from "./CanvasMap";

import "../Styles/components/listItem.css";

const ListItem = ({ path }: { path: Path }): JSX.Element => {
  //@ts-ignore
  const [context, setContext]: [ContextType, any] = React.useContext(Context);

  const handleSelectPath = React.useCallback(() => {
    setContext((oldContext: ContextType) => ({
      ...oldContext,
      selectedPathId: path.id,
    }));
  }, [path, setContext]);

  const handleDeletePath = React.useCallback(() => {
    setContext((oldContext: ContextType) => {
      document.cookie = path.id + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
      delete oldContext.addedPaths[path.id!];
      return {
        ...oldContext,
        selectedPathId:
          oldContext.selectedPathId !== path.id
            ? oldContext.selectedPathId
            : undefined,
      };
    });
  }, [path, setContext]);

  return (
    <div className="ListItemWrapper">
      <Button
        className={
          context.selectedPathId === path.id
            ? "SelectedListItemButton"
            : "ListItemButton"
        }
        onClick={handleSelectPath}
      >
        <div>
          <CanvasMap previewSize selectedPathId={path.id} />
        </div>
        <div className="PathDate">
          {format(new Date(path.date), "dd. MMM. yyyy | HH:MM:ss")}
        </div>
      </Button>
      <IconButton className="Button" onClick={handleDeletePath}>
        <Delete />
      </IconButton>
    </div>
  );
};

export default React.memo(ListItem);
