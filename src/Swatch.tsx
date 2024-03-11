import { ReactNode } from 'react'
import { nextStitchColorByIndex } from './color'
import { StitchPattern, Color, ColorSequenceArray } from './types'
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

function Swatch(
  { colorSequence, stitchesPerRow, stitchPattern, numberOfRows = 40, colorShift = 0, staggerLengths = false, className}
  : {
    colorSequence: ColorSequenceArray,
    stitchesPerRow: number,
    stitchPattern: StitchPattern,
    numberOfRows?: number,
    colorShift?: number,
    staggerLengths?: boolean,
    className?: string
  }
) {
  const clusterConfig = clusterConfiguration[stitchPattern];
  const clusterLength = clusterConfig.stitchCount;
  const classNames = [
    className,
    'swatch',
    stitchPattern,
    clusterLength ? 'clustered' : '',
    staggerLengths ? 'staggered' : ''
  ]

  let stitchIndex = 0;
  const nextColor = () => {
    const color = nextStitchColorByIndex(stitchIndex, colorSequence, {colorShift})
    stitchIndex++;
    return color;
  }

  const buildStitch = (props={}) => (<Stitch {...props} color={nextColor()}/>)

  return <div data-testid="swatch" className={classNames.join(' ')}>
    {
      clusterLength ?
      [...Array(numberOfRows)].map((e, i) => (
        <Crow key={i}>
          {
            clusterConfig.prepend ?  <Cluster>{buildStitch()}</Cluster> : ''
          }
          {
            [...Array(stitchesPerRow)].map((f,j) => (
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

      : staggerLengths ? 
      [...Array(numberOfRows)].map((e, i) => {
        const repeatLength = i % 2 === 1 ? stitchesPerRow : stitchesPerRow + 1;
        return (<Crow key={i}>
          {
            [...Array(repeatLength)].map((f,j) => buildStitch({key: j}))
          }
        </Crow>)
      })

      : //default case
      [...Array(numberOfRows)].map((e, i) => (
        <Crow key={i}>
          {
            [...Array(stitchesPerRow)].map((f,j) => buildStitch({key: j}))
          }
        </Crow>
      ))
    }
  </div>;
}

export default Swatch
