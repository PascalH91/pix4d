export type ID = string;

export type LatLng = { lat: number; lng: number };

export type Path = {
  id?: string;
  date: string;
  path?: LatLng[];
  mapSettings: { center: number[]; zoom: number };
};

export type PathInfo = {
  [key: string]: Path;
};

export type Context = {
  addedPaths: PathInfo;
  selectedPathId?: ID;
};

export type MapEvent = {
  layer: {
    editing: { latlngs: { lat: number; lng: number }[] };
  };
  target: {
    _lastCenter: LatLng;
    _zoom: number;
  };
};
