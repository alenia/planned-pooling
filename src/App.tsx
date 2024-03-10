import SwatchWithForm from './SwatchWithForm';
import { StitchPattern, Color } from './types'
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { URLSearchParamsFromSwatchConfig, sanitizeSearchParamInputs } from './searchHelpers';

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [swatchConfig, setSwatchConfig] = useState({
    colorConfig: sanitizeSearchParamInputs.colorConfig(searchParams) || [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    crowLength: sanitizeSearchParamInputs.crowLength(searchParams) || 18, //Note: explicitly ok not saving zero from search params here
    crows: sanitizeSearchParamInputs.crows(searchParams) || 40, //Note: explicitly ok not pulling zero from search params here
    colorShift: sanitizeSearchParamInputs.colorShift(searchParams) || 0,
    staggerLengths: sanitizeSearchParamInputs.staggerLengths(searchParams),
    stitchPattern: sanitizeSearchParamInputs.stitchPattern(searchParams) || StitchPattern.moss,
    showRowNumbers: false
  })

  useEffect(() => {
    const newSearchParams = URLSearchParamsFromSwatchConfig(swatchConfig)

    setSearchParams(newSearchParams)
  }, [swatchConfig, setSearchParams])

  return (
    <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} />
  );
}

export default App;
