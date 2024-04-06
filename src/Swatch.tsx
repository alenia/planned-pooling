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

function ClusteredSwatch(
  { clustersPerRow, numberOfRows, clusterConfig, nextColor}
  : {
    clustersPerRow: number,
    numberOfRows: number,
    clusterConfig: ClusterConfiguration,
    nextColor: (index: number) => Color
  }
) {
  let stitchIndex = 0

  const buildStitch = () => {
    const color = nextColor(stitchIndex)
    stitchIndex++;
    return <Stitch key={stitchIndex} color={color}/>;
  }
  return (
    [...Array(numberOfRows)].map((e, i) => (
      <Crow key={i}>
        {
          clusterConfig.prepend ?  <Cluster>{buildStitch()}</Cluster> : ''
        }
        {
          [...Array(clustersPerRow)].map((f,j) => (
            <Cluster key={j}>
              {
                [...Array(clusterConfig.stitchCount)].map(() => (buildStitch()))
              }
            </Cluster>
          ))
        }
        {
          clusterConfig.append ?  <Cluster>{buildStitch()}</Cluster> : ''
        }
      </Crow>
    ))
  )
}

function StandardSwatch(
  { stitchesPerRow, numberOfRows, staggerLengths, staggerType, nextColor}
  : {
    stitchesPerRow: number,
    numberOfRows: number,
    staggerLengths: boolean,
    staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed',
    nextColor: (index: number) => Color,
  }
) {
  let stitchIndex = 0;
  const buildColorStretchedStitch = () => {
    const color = nextColor(stitchIndex)
    return <Stitch key={`stretch${stitchIndex}`} color={color}/>;
  }

  const buildStitch = () => {
    const color = nextColor(stitchIndex)
    stitchIndex++;
    return <Stitch key={stitchIndex} color={color}/>;
  }
  if(staggerLengths && staggerType === 'colorStretched') {
    return (
      [...Array(numberOfRows)].map((e, i) => {
        if( i%2 === 0) {
          return (<Crow key={i}>
            {
              [...Array(stitchesPerRow)].map(() => buildStitch())
            }
          </Crow>)
        } else {
          return (<Crow key={i}>
            {
              [...Array(stitchesPerRow - 1)].map(() => buildStitch())
            }
            { buildColorStretchedStitch() }
          </Crow>)
        }
      })
    )
  }
  return (
    [...Array(numberOfRows)].map((e, i) => {
      const repeatLength = (staggerLengths && i % 2 === 0) ? stitchesPerRow + 1 : stitchesPerRow;
      return (<Crow key={i}>
        {
          [...Array(repeatLength)].map(() => buildStitch())
        }
      </Crow>)
    })
  )
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

  const computedColorShift = staggerLengths && staggerType === 'colorSwallowed' ? colorShift - 1 : colorShift

  const classNames = [
    className,
    'swatch',
    stitchPattern,
    clustered ? 'clustered' : '',
    staggerLengths ? 'staggered' : '',
    staggerType
  ]

  const nextColor = (index: number) => nextStitchColorByIndex(index, colorSequence, {colorShift: computedColorShift})

  return <div data-testid="swatch" className={classNames.join(' ')}>
    {
      clustered ?
      <ClusteredSwatch
        clustersPerRow={stitchesPerRow}
        clusterConfig={clusterConfig}
        numberOfRows={numberOfRows}
        nextColor={nextColor}
      />

      :
      <StandardSwatch
        stitchesPerRow={stitchesPerRow}
        numberOfRows={numberOfRows}
        staggerLengths={staggerLengths}
        staggerType={staggerType}
        nextColor={nextColor}
      />
    }
  </div>;
}

export default Swatch
