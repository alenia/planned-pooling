import Swatch from './Swatch';
import Form from './Form';
import { SwatchConfig } from './types'

function SwatchWithForm({swatchConfig, setSwatchConfig, staggerType}  : {
  swatchConfig: SwatchConfig,
  setSwatchConfig: (arg0: SwatchConfig) => void,
  staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed'
}) {
  return (
  <div>
    <Form
      formData={swatchConfig}
      setFormData={setSwatchConfig}
    />
    <Swatch 
      className={swatchConfig.showRowNumbers ? "numbered" : ""}
      staggerType={staggerType}
      {...swatchConfig}
    />
  </div>
  );
}

export default SwatchWithForm;
