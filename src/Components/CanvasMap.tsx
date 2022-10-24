import React from "react";
import lodash from "lodash";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polyline,
  useMap,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import { drawProperties } from "../consts";
import { Context } from "..";
import { Context as ContextType, ID, MapEvent } from "../utils/types";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { LatLngTuple } from "leaflet";

const CanvasMap = ({
  selectedPathId,
  previewSize,
  onCreate,
}: {
  selectedPathId?: ID;
  previewSize?: boolean;
  onCreate?: (event: MapEvent) => void;
}): JSX.Element => {
  //@ts-ignore
  const [context, _]: [ContextType, any] = React.useContext(Context);
  const { addedPaths } = context;
  const selectedPath = selectedPathId ? addedPaths[selectedPathId] : undefined;
  const center =
    (selectedPath?.mapSettings.center as LatLngTuple) ||
    ([52.512851826729126, 13.408405780792238] as LatLngTuple);
  let draggedCenter = center;

  const basicZoom = selectedPath?.mapSettings.zoom || 16;
  const zoom = !previewSize ? basicZoom : Number(basicZoom) - 4;
  const path = selectedPath?.path;

  const handleCreatedDraw = React.useCallback(
    (event: any) => {
      //overwriting ov event necessary because pan position does not get transferred to event by leaflet (bug?)
      const transformedEvent = lodash.cloneDeep(event);
      transformedEvent.target._lastCenter = draggedCenter;
      onCreate && onCreate(transformedEvent);
    },
    [draggedCenter, onCreate]
  );

  const Map = () => {
    const map = useMap();
    map.on("moveend", (e) => {
      draggedCenter = map.getCenter() as unknown as LatLngTuple;
    });
    React.useEffect(() => {
      map.flyTo(center as LatLngTuple, zoom);
      map.eachLayer(function (layer) {
        //@ts-ignore
        if (layer.options.color === "red") {
          map.removeLayer(layer);
        }
      });
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      style={{
        height: previewSize ? "40px" : "450px",
        width: previewSize ? "50px" : "100%",
        borderRadius: "0.3rem",
      }}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={!previewSize && true}
      attributionControl={false}
    >
      <Map />
      <FeatureGroup>
        {!previewSize && (
          <EditControl
            position="topleft"
            onCreated={handleCreatedDraw}
            draw={drawProperties}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        )}

        {path && <Polyline positions={path} />}
      </FeatureGroup>
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default React.memo(CanvasMap);
