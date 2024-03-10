import Swatch from './Swatch';
import Form from './Form';
import { SwatchConfig } from './types'

function SwatchWithForm({swatchConfig, setSwatchConfig}  : { swatchConfig: SwatchConfig, setSwatchConfig: (arg0: SwatchConfig) => void}) {
  return (
  <div>
    <Form
      formData={swatchConfig}
      setFormData={setSwatchConfig}
    />
    <Swatch 
    className={swatchConfig.showRowNumbers ? "numbered" : ""}
    {...swatchConfig} />
  </div>
  );
}

export default SwatchWithForm;
