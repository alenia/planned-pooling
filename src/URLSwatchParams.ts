import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { URLSearchParamsFromSwatchConfig, sanitizeSearchParamInputs } from './searchHelpers';
import { SwatchConfig } from './types'

export function useSwatchConfigStateFromURLParams(defaultSwatchConfig : SwatchConfig) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence:  sanitizeSearchParamInputs.colorSequence(searchParams)  || defaultSwatchConfig.colorSequence,
    stitchesPerRow: sanitizeSearchParamInputs.stitchesPerRow(searchParams) || defaultSwatchConfig.stitchesPerRow, //Note: explicitly ok not saving zero from search params here
    numberOfRows:   sanitizeSearchParamInputs.numberOfRows(searchParams)   || defaultSwatchConfig.numberOfRows, //Note: explicitly ok not pulling zero from search params here
    colorShift:     sanitizeSearchParamInputs.colorShift(searchParams)     || defaultSwatchConfig.colorShift,
    staggerLengths: sanitizeSearchParamInputs.staggerLengths(searchParams, defaultSwatchConfig.staggerLengths),
    stitchPattern:  sanitizeSearchParamInputs.stitchPattern(searchParams)  || defaultSwatchConfig.stitchPattern
  })

  return {swatchConfig, setSwatchConfig, setSearchParams}
}

export function useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig : SwatchConfig, setSearchParams : (arg0: URLSearchParams) => void) {
  useEffect(() => {
    const newSearchParams = URLSearchParamsFromSwatchConfig(swatchConfig)

    setSearchParams(newSearchParams)
  }, [swatchConfig, setSearchParams])
}
