import { DeepReadonly } from "ts-essentials";
import { ColorInSequence } from './types'
type Colorway = {
  yarnName: string,
  colorway: string,
  colorSequence: Array<ColorInSequence>
}

export const defaultDunaColorwayId = "duna-9391"
export const dunaColorways : Record<string, DeepReadonly<Colorway>> = {
  "duna-9391": {
    "yarnName": "Circulo Duna",
    "colorway": "9391 Aloe Vera",
    "colorSequence": [
      {"color": "#99c944", "length": 3},
      {"color": "#325303", "length": 5},
      {"color": "#99c944", "length": 3},
      {"color": "#ecf5da", "length": 5}
    ]
  },
  "duna-9642": {
    "yarnName": "Circulo Duna",
    "colorway": "9642 Intuition",
    "colorSequence": [
      {"color": "#0e0e66", "length": 3},
      {"color": "#ff001d", "length": 3},
      {"color": "#0e0e66", "length": 3},
      {"color": "#8dd0f2", "length": 2},
      {"color": "#fcf7eb", "length": 3},
      {"color": "#8dd0f2", "length": 2}
    ]
  },
  "duna-9482": {
    "yarnName": "Circulo Duna",
    "colorway": "9482 Pacific",
    "colorSequence": [
      {"color": "#1c40b8", "length": 3},
      {"color": "#121253", "length": 5},
      {"color": "#1c40b8", "length": 3},
      {"color": "#37aff0", "length": 5}
    ]
  },
  "duna-9128": {
    "yarnName": "Circulo Duna",
    "colorway": "9128 Winter",
    "colorSequence": [
      {"color": "#3562d5", "length": 5},
      {"color": "#73bef4", "length": 3},
      {"color": "#ebf5fc", "length": 5},
      {"color": "#73bef4", "length": 3}
    ]
  },
  "duna-9687": {
    "yarnName": "Circulo Duna",
    "colorway": "9687 Caravel",
    "colorSequence": [
      {"color": "#542e0f", "length": 5},
      {"color": "#bc9371", "length": 3},
      {"color": "#f4ece4", "length": 5},
      {"color": "#bc9371", "length": 3}
    ]
  },
  "duna-9165": {
    "yarnName": "Circulo Duna",
    "colorway": "9165 Yellow Hibiscus",
    "colorSequence": [
      {"color": "#e70f43", "length": 5},
      {"color": "#ff8500", "length": 3},
      {"color": "#fce136", "length": 5},
      {"color": "#ff8500", "length": 3},
    ]
  },
  "duna-9492": {
    "yarnName": "Circulo Duna",
    "colorway": "9492 Sunflower",
    "colorSequence": [
      {"color": "#542e0f", "length": 5},
      {"color": "#fda02c", "length": 3},
      {"color": "#fae245", "length": 5},
      {"color": "#fda02c", "length": 3},
    ]
  },
  "duna-9563": {
    "yarnName": "Circulo Duna",
    "colorway": "9563 Winery",
    "colorSequence": [
      {"color": "#27105d", "length": 5},
      {"color": "#6549a7", "length": 3},
      {"color": "#b8aed4", "length": 5},
      {"color": "#6549a7", "length": 3},
    ]
  },
}

//const colorways : Record<string, DeepReadonly<Colorway>> = { ...dunaColorways }

//export default colorways;
