import SwatchWithForm from './SwatchWithForm';
import { StitchPattern, Color } from './types'

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

function App() {
  const config = {
    colorConfig: [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    crowLength: 18,
    crows: 40,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
    showRowNumbers: false
  }

  return (
  <div className="container">
    <SwatchWithForm {...config} />
  </div>
  );
}

export default App;
