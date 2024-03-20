import { ColorInSequence } from './types'
type Colorway = {
  yarnName: string,
  colorway: string,
  id: string,
  colorSequence: Array<ColorInSequence>
}

export const dunaColorways : Array<Colorway> = [ {
    "yarnName": "Circulo Duna",
    "colorway": "9391 Aloe Vera",
    "id": "duna-9391",
    "colorSequence": [
      {"color": "#99c944", "length": 3},
      {"color": "#325303", "length": 5},
      {"color": "#99c944", "length": 3},
      {"color": "#ecf5da", "length": 5}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9642 Intuition",
    "id": "duna-9642",
    "colorSequence": [
      {"color": "#0e0e66", "length": 3},
      {"color": "#ff001d", "length": 3},
      {"color": "#0e0e66", "length": 3},
      {"color": "#8dd0f2", "length": 2},
      {"color": "#fcf7eb", "length": 5},
      {"color": "#8dd0f2", "length": 2}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9482 Pacific",
    "id": "duna-9482",
    "colorSequence": [
      {"color": "#1C40B8", "length": 4},
      {"color": "#121253", "length": 5},
      {"color": "#1C40B8", "length": 4},
      {"color": "#37AFF0", "length": 5}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9128 Winter",
    "id": "duna-9128",
    "colorSequence": [
      {"color": "#3562d5", "length": 5},
      {"color": "#73BEF4", "length": 3},
      {"color": "#EBF5FC", "length": 5},
      {"color": "#73BEF4", "length": 3}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9687 Caravel",
    "id": "duna-9687",
    "colorSequence": [
      {"color": "#542E0F", "length": 5},
      {"color": "#BC9371", "length": 3},
      {"color": "#F4ECE4", "length": 5},
      {"color": "#BC9371", "length": 3}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9165 Yellow Hibiscus",
    "id": "duna-9165",
    "colorSequence": [
      {"color": "#f51505", "length": 5},
      {"color": "#f57605", "length": 3},
      {"color": "#f5d505", "length": 5},
      {"color": "#f57605", "length": 3}
    ]
  },
  {
    "yarnName": "Circulo Duna",
    "colorway": "9492 Sunflower",
    "id": "duna-9492",
    "colorSequence": [
      {"color": "#542E0F", "length": 5},
      {"color": "#c28a11", "length": 3},
      {"color": "#f5d505", "length": 5},
      {"color": "#c28a11", "length": 3}
    ]
  }
]

const colorways : Array<Colorway> = { ...dunaColorways }

export default colorways;
