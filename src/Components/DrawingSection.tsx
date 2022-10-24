import React from "react";
import { Typography, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { writePathToCookies } from "../utils/helper";
import { Context as ContextType, MapEvent, Path } from "../utils/types";
import { Context } from "../index";
import CanvasMap from "./CanvasMap";

import "../Styles/components/drawingSection.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const DrawingSection = (): JSX.Element => {
  //@ts-ignore
  const [context, setContext]: [ContextType, any] = React.useContext(Context);
  const [pathDataLoaded, setPathDataLoaded] = React.useState<Path | undefined>(
    undefined
  );

  const handleSavePath = React.useCallback(() => {
    if (pathDataLoaded?.path) {
      const pathInfo = writePathToCookies(pathDataLoaded);
      setContext((oldContext: ContextType) => ({
        addedPaths: { ...oldContext.addedPaths, [pathInfo.id!]: pathInfo },
        selectedPathId: pathInfo.id,
      }));
    }
  }, [pathDataLoaded, setContext]);

  const handleCreatePath = React.useCallback((event: MapEvent) => {
    setPathDataLoaded({
      path: event.layer.editing.latlngs,
      date: new Date().toISOString(),
      mapSettings: {
        center: [event.target._lastCenter.lat, event.target._lastCenter.lng],
        zoom: event.target._zoom,
      },
    });
  }, []);

  const handleClearAll = React.useCallback(() => {
    setContext((oldContext: ContextType) => ({
      ...oldContext,
      selectedPathId: undefined,
    }));
  }, [setContext]);

  return (
    <div className="CanvasOuterWrapper">
      <Typography
        className="CanvasHeading"
        variant="h2"
        fontSize={{ xs: "2rem", md: "3rem" }}
      >
        DRAW YOUR PATH
      </Typography>
      <CanvasMap
        onCreate={handleCreatePath}
        selectedPathId={context.selectedPathId}
      />
      <div className="ButtonWrapper">
        <Button
          onClick={handleClearAll}
          className="TextButton"
          variant="contained"
        >
          Clear All
        </Button>
        <Button
          onClick={handleSavePath}
          className="TextButton"
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default React.memo(DrawingSection);
