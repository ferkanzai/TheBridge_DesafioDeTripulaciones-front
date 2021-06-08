export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "charge-points",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "charge-points",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

const free = ["==", ["get", "waiting_time"], 0];
const lessThan5 = ["<=", ["get", "waiting_time"], 5];
const lessThan15 = [
  "all",
  [">", ["get", "waiting_time"], 5],
  ["<=", ["get", "waiting_time"], 15],
];
const lessThan30 = [
  "all",
  [">", ["get", "waiting_time"], 5],
  ["<=", ["get", "waiting_time"], 30],
];
const lessThan45 = [
  "all",
  [">", ["get", "waiting_time"], 5],
  ["<=", ["get", "waiting_time"], 30],
];

const colors = [
  "#1DAE69",
  "#89CC33",
  "#C5D22A",
  "#FAD966",
  "#B75454",
  "#C4C4C4",
];

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "charge-points",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-radius": 9,
    "circle-stroke-width": 1,
    "circle-stroke-color": "black",
    "circle-color": [
      "case",
      free,
      colors[0],
      lessThan5,
      colors[1],
      lessThan15,
      colors[2],
      lessThan30,
      colors[3],
      lessThan45,
      colors[4],
      colors[5],
    ],
  },
};
