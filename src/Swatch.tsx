import { ReactNode } from 'react'
import { nextStitchColorByIndex } from './colorSequenceHelpers'
import { swatchMatrix, clusteredSwatchMatrix } from './swatchHelpers'
import { StitchPattern, Color, ColorSequenceArray, StandardSwatchConfig } from './types'
import './Swatch.scss'

type ClusterConfiguration = {
    stitchCount?: number,
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

function ClusteredSwatch({
  colorSequence,
  stitchesPerRow,
  numberOfRows,
  colorShift,
  staggerLengths,
  staggerType,
  clusterConfig,
} : StandardSwatchConfig & {staggerType: 'normal' | 'colorStretched' | 'colorSwallowed', clusterConfig: ClusterConfiguration}) {
  const matrix = clusteredSwatchMatrix({colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths}, clusterConfig)
  return matrix.map((rowArray, i) => (
    <Crow key={i}>
      { rowArray.map((clusterArray, j) => (
        <Cluster key ={j}>
          { clusterArray.map((color, k) => (
            <Stitch key={k} color={color}/>
          )) }
        </Cluster>
      )) }
    </Crow>
  ))
}

function StandardSwatch({
  colorSequence,
  stitchesPerRow,
  numberOfRows,
  colorShift,
  staggerLengths,
  staggerType
} : StandardSwatchConfig & {staggerType: 'normal' | 'colorStretched' | 'colorSwallowed'}) {
  const matrix = swatchMatrix({colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths, staggerType})
  return matrix.map((rowArray, i) => (
    <Crow key={i}>
      { rowArray.map((color, i) => (
        <Stitch key={i} color={color}/>
      )) }
    </Crow>
  ))
}

function Swatch(
  { colorSequence, stitchesPerRow, stitchPattern, numberOfRows = 40, colorShift = 0, staggerLengths = false, staggerType, className}
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
    return <div data-testid="swatch" className={classNames.join(' ')}>
      <ClusteredSwatch
        clusterConfig={clusterConfig}
        stitchesPerRow={stitchesPerRow}
        numberOfRows={numberOfRows}
        staggerLengths={staggerLengths}
        staggerType={staggerType || 'normal'}
        colorSequence={colorSequence}
        colorShift={colorShift}
      />
    </div>
  } else {
    return <div data-testid="swatch" className={classNames.join(' ')}>
      <StandardSwatch
        stitchesPerRow={stitchesPerRow}
        numberOfRows={numberOfRows}
        staggerLengths={staggerLengths}
        staggerType={staggerType || 'normal'}
        colorSequence={colorSequence}
        colorShift={colorShift}
      />
    </div>
  }
}

export default Swatch
