import { ReactNode } from 'react'
import { swatchMatrix, clusteredSwatchMatrix } from './swatchHelpers'
import { StitchPattern, Color, ColorSequenceArray, ClusterConfiguration, StaggerType } from './types'
import './Swatch.scss'

const clusterConfiguration:Record<StitchPattern, (ClusterConfiguration | null)> = { //Todo: make this a class of some sort?
  moss: null,
  'compact-moss': null,
  unstyled: null,
  stacked: null,
  granny: null,
  hdc: null,
  shell: null,
  'v-stitch': null,
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
  { colorSequence, stitchesPerRow, stitchPattern, numberOfRows = 40, colorShift = 0, staggerLengths = false, staggerType = 'normal', className}
  : {
    colorSequence: ColorSequenceArray,
    stitchesPerRow: number,
    stitchPattern: StitchPattern,
    numberOfRows?: number,
    colorShift?: number,
    staggerLengths?: boolean,
    staggerType?: StaggerType,
    className?: string
  }
) {
  const clusterConfig = clusterConfiguration[stitchPattern];

  const classNames = [
    className,
    'swatch',
    stitchPattern,
    clusterConfig ? 'clustered' : '',
    staggerLengths ? 'staggered' : '',
    staggerType
  ]

  if(clusterConfig) {
    const matrix = clusteredSwatchMatrix({colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths}, clusterConfig)
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
