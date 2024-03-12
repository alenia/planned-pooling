import Swatch from './Swatch';
import Form from './Form';
import { SwatchConfig } from './types'

function SwatchWithForm({swatchConfig, setSwatchConfig, staggerType, showExperimentalFeatures}  : {
  swatchConfig: SwatchConfig,
  setSwatchConfig: (arg0: SwatchConfig) => void,
  staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed'
  showExperimentalFeatures?: boolean,
}) {
  return (
  <div>
    <Form
      formData={swatchConfig}
      setFormData={setSwatchConfig}
      staggerType={staggerType}
      showExperimentalFeatures={!!showExperimentalFeatures}
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
