import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color } from '../types'
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { URLSearchParamsFromSwatchConfig, sanitizeSearchParamInputs } from '../searchHelpers';

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

function StretchLengths() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: sanitizeSearchParamInputs.colorSequence(searchParams) || [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    stitchesPerRow: sanitizeSearchParamInputs.stitchesPerRow(searchParams) || 18, //Note: explicitly ok not saving zero from search params here
    numberOfRows: sanitizeSearchParamInputs.numberOfRows(searchParams) || 40, //Note: explicitly ok not pulling zero from search params here
    colorShift: sanitizeSearchParamInputs.colorShift(searchParams) || 0,
    staggerLengths: sanitizeSearchParamInputs.staggerLengths(searchParams),
    stitchPattern: sanitizeSearchParamInputs.stitchPattern(searchParams) || StitchPattern.moss,
  })

  useEffect(() => {
    const newSearchParams = URLSearchParamsFromSwatchConfig(swatchConfig)

    setSearchParams(newSearchParams)
  }, [swatchConfig, setSearchParams])

  return (
    <div>
      <p>This is an experimental page</p>
      <ul>
        <li>alternating row lengths uses the color stretching technique instead of changing lengths of rows</li>
        <li>there is a button to double your colors</li>
      </ul>
      <p>If you don&apos;t know what I&apos;m talking about use the <a href='/'>main app.</a></p>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        staggerType={'colorStretched'}
        showExperimentalFeatures={true}
      />
    </div>
  );
}

export default StretchLengths;
