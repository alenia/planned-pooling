import Swatch from './Swatch';
import Form from './Form';
import { SwatchConfig } from './types'
import { useState } from "react";

function SwatchWithForm({swatchConfig, setSwatchConfig}  : { swatchConfig: SwatchConfig, setSwatchConfig: (arg0: SwatchConfig) => void}) {
  const [displayData, setDisplayData] = useState({
    showRowNumbers: false
  })
  return (
  <div>
    <Form
      swatchData={swatchConfig}
      setSwatchData={setSwatchConfig}
      displayData={displayData}
      setDisplayData={setDisplayData}
    />
    <Swatch 
    className={displayData.showRowNumbers ? "numbered" : ""}
    {...swatchConfig} />
  </div>
  );
}

export default SwatchWithForm;
