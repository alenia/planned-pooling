import Swatch from './Swatch';
import Form from './Form';
import { SwatchParams } from './types'

function SwatchWithForm({swatchParams, setSwatchParams}  : { swatchParams: SwatchParams, setSwatchParams: (arg0: SwatchParams) => void}) {
  return (
  <div>
    <Form
      formData={swatchParams}
      setFormData={setSwatchParams} 
    />
    <Swatch 
    className={swatchParams.showRowNumbers ? "numbered" : ""}
    {...swatchParams} />
  </div>
  );
}

export default SwatchWithForm;
