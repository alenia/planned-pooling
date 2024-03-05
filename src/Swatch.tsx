import { ReactNode } from 'react'
import { nextStitchColorByIndex } from './color'
import { StitchPattern, Color, ColorConfigArray } from './types'
import './Swatch.scss'

type ClusterConfiguration = {
    stitchCount?: number,
    prepend?: boolean ,
    append?: boolean,
}
const clusterConfiguration:Record<StitchPattern, ClusterConfiguration> = { //Todo: make this a class of some sort?
  moss: {},
  unstyled: {},
  stacked: {},
  granny: {},
  hdc: {},
  shell: {},
  'v-stitch': {},
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

function Crow (props: { children : ReactNode }) {
  return <div className="crow">{props.children}</div>
}

function Cluster (props: { children : ReactNode}) {
  return <div className="cluster">{props.children}</div>
}

function Stitch ({color} : { color: Color}) {
  return <div className="stitch" style={{backgroundColor: color}}/>
}

function buildSwatch(
  { colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false}
  : {
    colorConfig: ColorConfigArray,
    crowLength: number,
    stitchPattern: StitchPattern,
    crows?: number,
    colorShift?: number,
    staggerLengths?: boolean,

  }
) {
  const clusterConfig = clusterConfiguration[stitchPattern];
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


function Swatch(
  { colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false, className}
  : {
    colorConfig: ColorConfigArray,
    crowLength: number,
    stitchPattern: StitchPattern,
    crows?: number,
    colorShift?: number,
    staggerLengths?: boolean,
    className?: string
  }
) {
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

export default Swatch
