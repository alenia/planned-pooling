import SwatchWithForm from './SwatchWithForm';
import { StitchPattern } from './types'

const red = "#ff001d";
const cream = "#fcf7eb";
const ltblue = "#8dd0f2";
const navy = "#0e0e66";

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
