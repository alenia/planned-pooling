import { ReactNode } from 'react'
import { swatchMatrix, clusteredSwatchMatrix } from './swatchHelpers'
import { StitchPattern, Color, ColorSequenceArray } from './types'
import './Swatch.scss'

type ClusterConfiguration = {
    stitchCount?: number,
    prepend?: boolean ,
    append?: boolean,
}
type PresentClusterConfiguration = {
    stitchCount: number,
    prepend?: boolean ,
    append?: boolean,
}
const clusterConfiguration:Record<StitchPattern, ClusterConfiguration> = { //Todo: make this a class of some sort?
  moss: {},
  'compact-moss': {},
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
  { colorSequence, stitchesPerRow, stitchPattern, numberOfRows = 40, colorShift = 0, staggerLengths = false, staggerType = "normal", className}
  : {
    colorSequence: ColorSequenceArray,
    stitchesPerRow: number,
    stitchPattern: StitchPattern,
    numberOfRows?: number,
    colorShift?: number,
    staggerLengths?: boolean,
    staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed'
    className?: string
  }
) {
  const clusterConfig = clusterConfiguration[stitchPattern];
  const clustered = !!clusterConfig.stitchCount;

  const classNames = [
    className,
    'swatch',
    stitchPattern,
    clustered ? 'clustered' : '',
    staggerLengths ? 'staggered' : '',
    staggerType
  ]

  if(clustered) {
    const matrix = clusteredSwatchMatrix({colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths}, clusterConfig as PresentClusterConfiguration)
    return <div data-testid="swatch" className={classNames.join(' ')}>
      {matrix.map((rowArray, i) => (
        <Crow key={i}>
          { rowArray.map((clusterArray, j) => (
            <Cluster key ={j}>
              { clusterArray.map((color, k) => (
                <Stitch key={k} color={color}/>
              )) }
            </Cluster>
          )) }
        </Crow>
      ))}
    </div>
  } else {
    const matrix = swatchMatrix({colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths, staggerType})
    return <div data-testid="swatch" className={classNames.join(' ')}>
      { matrix.map((rowArray, i) => (
        <Crow key={i}>
          { rowArray.map((color, i) => (
            <Stitch key={i} color={color}/>
          )) }
        </Crow>
      ))}
    </div>
  }
}

export default Swatch
