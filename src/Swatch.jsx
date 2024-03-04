import PropTypes from "prop-types";
import { nextStitchColorByIndex } from './color.js'
import ExtraPropTypes from './extraPropTypes.js'
import './Swatch.scss'

const clusterConfiguration = { //Todo: make this a class of some sort?
  jasmine: {
    stitchCount: 3,
    prepend: true
  },
  ripple: {
    stitchCount: 5,
  },
  vstitchCluster: {
    stitchCount: 2,
    prepend: true,
    append: true
  },
  ablockCluster: {
    stitchCount: 4
  }
}



function Crow (props) {
  return <div className="crow">{props.children}</div>
}
Crow.propTypes = {
  children: PropTypes.node
}
function Cluster (props) {
  return <div className="cluster">{props.children}</div>
}
Cluster.propTypes = {
  children: PropTypes.node
}

function Stitch ({color}) {
  return <div className="stitch" style={{backgroundColor: color}}/>
}
Stitch.propTypes = {
  color: PropTypes.string //TODO: see if there's a color type
}


function buildSwatch({ colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false}) {
  const clusterConfig = clusterConfiguration[stitchPattern] || {};
  const clusterLength = clusterConfig.stitchCount;

  let stitchIndex = 0;
  const nextColor = () => {
    const color = nextStitchColorByIndex(stitchIndex, colorConfig, {colorShift})
    stitchIndex++;
    return color;
  }

  const buildStitch = (props={}) => <Stitch {...props} color={nextColor()}/>

  if(clusterLength) {
      return [...Array(crows)].map((e, i) => (
        <Crow key={i}>
        {
          clusterConfig.prepend ?  <Cluster>{buildStitch()}</Cluster> : ''
        }
        {
          [...Array(crowLength)].map((f,j) => (
            <Cluster key={j}>
            {
          [...Array(clusterLength)].map((f,k) => (
            buildStitch({key: k}))
                                    )
            }
            </Cluster>
          ))
        }
        {
          clusterConfig.append ?  <Cluster>{buildStitch()}</Cluster> : ''
        }
        </Crow>
      ))
  }
  if(staggerLengths) {
    return [...Array(crows)].map((e, i) => {
      const repeatLength = i % 2 === 1 ? crowLength : crowLength + 1;
      return (<Crow key={i}>
      {
        [...Array(repeatLength)].map((f,j) => buildStitch({key: j}))
      }
      </Crow>)
    })
  }
  return [...Array(crows)].map((e, i) => (
    <Crow key={i}>
    {
      [...Array(crowLength)].map((f,j) => buildStitch({key: j}))
    }
    </Crow>
  ))
}


function Swatch({ colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false, className}) {
  const clusterConfig = clusterConfiguration[stitchPattern];
  const classNames = [
    className,
    'swatch',
    stitchPattern,
    clusterConfig ? 'clustered' : '',
    staggerLengths ? 'staggered' : ''
  ]
  const swatch = (<div className={classNames.join(' ')}>
                  {buildSwatch({ colorConfig, crowLength, stitchPattern, crows, colorShift, staggerLengths})}
                 </div>);
  return swatch
}

Swatch.propTypes = {
  colorConfig: ExtraPropTypes.colorConfig.isRequired,
  stitchPattern: PropTypes.string, //TODO: Make this an enum
  crowLength: PropTypes.number.isRequired,
  crows: PropTypes.number,
  colorShift: PropTypes.number,
  staggerLengths: PropTypes.bool,
  className: PropTypes.string, //This just passes through, not needed in form or anything
}

export default Swatch
