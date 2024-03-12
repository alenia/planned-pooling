import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useState } from "react";


const ClickableTooltip = ({ title }: { title: string }) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);

  return (
    <Fragment>
      <FontAwesomeIcon icon={faCircleInfo} title={title} onClick={() => setDisplayTooltip(!displayTooltip)} />
      {
        displayTooltip ? (
          <div className='popover clickable-tooltip'>
            <div className='cover' onClick={() => setDisplayTooltip(false)} />
            <div className="tooltip">{title}</div>
          </div>
        ) : ''
      }
    </Fragment>
  )
}

export default ClickableTooltip;
