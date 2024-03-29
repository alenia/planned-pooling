import Swatch from './Swatch';
import Form from './Form';
import { SwatchConfig } from './types'
import { useState } from 'react';
import CheckboxInput from './inputs/Checkbox'

function SwatchWithForm({swatchConfig, setSwatchConfig, staggerType, showExperimentalFeatures, showRowNumbersInitially, formClasses}  : {
  swatchConfig: SwatchConfig,
  setSwatchConfig: (arg0: SwatchConfig) => void,
  staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed'
  showExperimentalFeatures?: boolean,
  showRowNumbersInitially?: boolean,
  formClasses?: string,
}) {
  const [displayRowNumbers, setDisplayRowNumbers] = useState(!!showRowNumbersInitially)

  return (
  <div>
    <div className="container">
      <Form
        swatchData={swatchConfig}
        setSwatchData={setSwatchConfig}
        staggerType={staggerType}
        showExperimentalFeatures={!!showExperimentalFeatures}
        formClasses={formClasses}
      />
      <CheckboxInput
        label="Show Row Numbers"
        title="Display row numbers at the beginning of each row."
        name="showRowNumbers"
        value={displayRowNumbers}
        setValue={(v: boolean) => setDisplayRowNumbers(v)}
        withTooltip={true}
      />
    </div>
    <Swatch 
      className={displayRowNumbers ? "numbered" : ""}
      staggerType={staggerType}
      {...swatchConfig}
    />
  </div>
  );
}

export default SwatchWithForm;
