import { StrictMode } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StitchPattern, SwatchConfig, ColorSequenceArray, StaggerType } from './types'
import Swatch from './Swatch'

const basicSwatchConfig = {
  colorSequence: [
    {color: '#f00', length: 3},
    {color: '#0f0', length: 2},
  ] as ColorSequenceArray,
  stitchesPerRow: 5,
  numberOfRows: 4,
  colorShift: 0,
  staggerLengths: false,
  stitchPattern: StitchPattern.moss
} as SwatchConfig

describe('Swatch', () => {
  it('passes through a classname', () => {
    render(
      <Swatch
        {...basicSwatchConfig}
        className='banana'
      />
    )
    const swatch = screen.getByTestId("swatch")
    expect(swatch).toHaveClass("banana")
  })
  describe('unclustered swatches', () => {
    describe('moss stitch', () => {
      it('properly colors stitches when there are multiple swatches in strict mode', () => {
        render(
          <StrictMode>
            <Swatch
              colorSequence={[
                {color: '#aaa', length: 1},
                {color: '#bbb', length: 1},
                {color: '#ccc', length: 1},
                {color: '#ddd', length: 1},
                {color: '#eee', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={4}
              colorShift={1}
              numberOfRows={2}
              staggerLengths={false}
            />
            <Swatch
              colorSequence={[
                {color: '#aaa', length: 1},
                {color: '#bbb', length: 1},
                {color: '#ccc', length: 1},
                {color: '#ddd', length: 1},
                {color: '#eee', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={4}
              colorShift={1}
              numberOfRows={2}
              staggerLengths={false}
            />
          </StrictMode>
        )

        const swatches = screen.getAllByTestId("swatch")
        expect(swatches[0].children[0].children[0]).toHaveStyle('background-color: #bbb')
        expect(swatches[1].children[0].children[0]).toHaveStyle('background-color: #bbb')
      })
      it('properly colors stitches when there are multiple swatches in strict mode, color stretched', () => {
        render(
          <StrictMode>
            <Swatch
              colorSequence={[
                {color: '#aaa', length: 1},
                {color: '#bbb', length: 1},
                {color: '#ccc', length: 1},
                {color: '#ddd', length: 1},
                {color: '#eee', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={4}
              colorShift={1}
              numberOfRows={2}
              staggerLengths={true}
              staggerType={StaggerType.colorStretched}
            />
            <Swatch
              colorSequence={[
                {color: '#aaa', length: 1},
                {color: '#bbb', length: 1},
                {color: '#ccc', length: 1},
                {color: '#ddd', length: 1},
                {color: '#eee', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={4}
              colorShift={1}
              numberOfRows={2}
              staggerLengths={false}
            />
          </StrictMode>
        )

        const swatches = screen.getAllByTestId("swatch")
        expect(swatches[0].children[0].children[0]).toHaveStyle('background-color: #bbb')
        expect(swatches[1].children[0].children[0]).toHaveStyle('background-color: #bbb')
      })
      it('renders a moss stitch swatch', () => {
        render(
          <Swatch
            {...basicSwatchConfig}
            stitchPattern={StitchPattern.moss}
          />
        )
        const swatch = screen.getByTestId("swatch")
        expect(swatch).toHaveClass("moss")
        expect(swatch).not.toHaveClass("clustered")
      })
      it('has the correct number of stitches per row and number of rows', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={false}
            />
          )

          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(4)
          expect(swatch.children[0].children.length, 'first row should have correct number of stitches').toEqual(5)
          expect(swatch.children[1].children.length, 'second row should have correct number of stitches').toEqual(5)
          expect(swatch.children[2].children.length, 'third row should have correct number of stitches').toEqual(5)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of stitches').toEqual(5)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('stitch')
      })

      it('allows you to change number of stitches and number of rows', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={9}
              numberOfRows={6}
              staggerLengths={false}
            />
          )

          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(6)
          expect(swatch.children[0].children.length, 'first row should have correct number of stitches').toEqual(9)
          expect(swatch.children[1].children.length, 'second row should have correct number of stitches').toEqual(9)
      })

      it('alternates row lengths', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={true}
            />
          )

          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(4)
          expect(swatch.children[0].children.length, 'first row should have correct number of stitches').toEqual(6)
          expect(swatch.children[1].children.length, 'second row should have correct number of stitches').toEqual(5)
          expect(swatch.children[2].children.length, 'third row should have correct number of stitches').toEqual(6)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of stitches').toEqual(5)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('stitch')
      })

      it('does not alternate row lengths when colors are swallowed', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              staggerType={StaggerType.colorSwallowed}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={true}
            />
          )

          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(4)
          expect(swatch.children[0].children.length, 'first row should have correct number of stitches').toEqual(5)
          expect(swatch.children[1].children.length, 'second row should have correct number of stitches').toEqual(5)
          expect(swatch.children[2].children.length, 'third row should have correct number of stitches').toEqual(5)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of stitches').toEqual(5)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('stitch')
      })

      it('properly colors stitches', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={false}
            />
          )

          const swatch = screen.getByTestId("swatch")
          const row0stitches = swatch.children[0].children;
          expect(row0stitches[0]).toHaveStyle('background-color: #000')
          expect(row0stitches[1]).toHaveStyle('background-color: #100')
          expect(row0stitches[2]).toHaveStyle('background-color: #200')
          expect(row0stitches[3]).toHaveStyle('background-color: #300')
          expect(row0stitches[4]).toHaveStyle('background-color: #400')
          const row1stitches = swatch.children[1].children;
          expect(row1stitches[0]).toHaveStyle('background-color: #500')
          expect(row1stitches[1]).toHaveStyle('background-color: #600')
          expect(row1stitches[2]).toHaveStyle('background-color: #700')
          expect(row1stitches[3]).toHaveStyle('background-color: #800')
          expect(row1stitches[4]).toHaveStyle('background-color: #000')
      })

      it('properly colors stitches with a color shift', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              colorShift={2}
              numberOfRows={4}
              staggerLengths={false}
            />
          )

          const swatch = screen.getByTestId("swatch")
          const row0stitches = swatch.children[0].children;
          expect(row0stitches[0]).toHaveStyle('background-color: #200')
          expect(row0stitches[1]).toHaveStyle('background-color: #300')
          expect(row0stitches[2]).toHaveStyle('background-color: #400')
          expect(row0stitches[3]).toHaveStyle('background-color: #500')
          expect(row0stitches[4]).toHaveStyle('background-color: #600')
          const row1stitches = swatch.children[1].children;
          expect(row1stitches[0]).toHaveStyle('background-color: #700')
          expect(row1stitches[1]).toHaveStyle('background-color: #800')
          expect(row1stitches[2]).toHaveStyle('background-color: #000')
          expect(row1stitches[3]).toHaveStyle('background-color: #100')
          expect(row1stitches[4]).toHaveStyle('background-color: #200')
      })

      it('properly colors stitches when lengths are staggered', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
                {color: '#900', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={true}
            />
          )

          const swatch = screen.getByTestId("swatch")
          const row0stitches = swatch.children[0].children;
          expect(row0stitches[0]).toHaveStyle('background-color: #000')
          expect(row0stitches[1]).toHaveStyle('background-color: #100')
          expect(row0stitches[2]).toHaveStyle('background-color: #200')
          expect(row0stitches[3]).toHaveStyle('background-color: #300')
          expect(row0stitches[4]).toHaveStyle('background-color: #400')
          expect(row0stitches[5]).toHaveStyle('background-color: #500')
          const row1stitches = swatch.children[1].children;
          expect(row1stitches[0]).toHaveStyle('background-color: #600')
          expect(row1stitches[1]).toHaveStyle('background-color: #700')
          expect(row1stitches[2]).toHaveStyle('background-color: #800')
          expect(row1stitches[3]).toHaveStyle('background-color: #900')
          expect(row1stitches[4]).toHaveStyle('background-color: #000')
      })

      it('skips a stitch color after each even row when colors are swallowed', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
                {color: '#900', length: 1},
              ]}
              stitchPattern={StitchPattern.moss}
              stitchesPerRow={5}
              numberOfRows={4}
              staggerLengths={true}
              staggerType={StaggerType.colorSwallowed}
            />
          )

          const swatch = screen.getByTestId("swatch")
          const row0stitches = swatch.children[0].children;
          expect(row0stitches[0]).toHaveStyle('background-color: #000')
          expect(row0stitches[1]).toHaveStyle('background-color: #100')
          expect(row0stitches[2]).toHaveStyle('background-color: #200')
          expect(row0stitches[3]).toHaveStyle('background-color: #300')
          expect(row0stitches[4]).toHaveStyle('background-color: #400')
          const row1stitches = swatch.children[1].children;
          expect(row1stitches[0]).toHaveStyle('background-color: #500')
          expect(row1stitches[1]).toHaveStyle('background-color: #600')
          expect(row1stitches[2]).toHaveStyle('background-color: #700')
          expect(row1stitches[3]).toHaveStyle('background-color: #800')
          expect(row1stitches[4]).toHaveStyle('background-color: #900')
          const row2stitches = swatch.children[2].children;
          expect(row2stitches[0]).toHaveStyle('background-color: #100')
          expect(row2stitches[1]).toHaveStyle('background-color: #200')
          expect(row2stitches[2]).toHaveStyle('background-color: #300')
          expect(row2stitches[3]).toHaveStyle('background-color: #400')
          expect(row2stitches[4]).toHaveStyle('background-color: #500')
      })

      it('color stretches with correct row lengths and colors', () => {
        render(
          <Swatch
            colorSequence={[
              {color: '#000', length: 1},
              {color: '#100', length: 1},
              {color: '#200', length: 1},
              {color: '#300', length: 1},
              {color: '#400', length: 1},
              {color: '#500', length: 1},
              {color: '#600', length: 1},
              {color: '#700', length: 1},
              {color: '#800', length: 1},
              {color: '#900', length: 1},
            ]}
            stitchPattern={StitchPattern.moss}
            staggerType={StaggerType.colorStretched}
            stitchesPerRow={5}
            numberOfRows={4}
            staggerLengths={true}
          />
        )

        const swatch = screen.getByTestId("swatch")
        expect(swatch.children.length, 'should have correct numberOfRows').toEqual(4)
        const row0stitches = swatch.children[0].children;
        expect(row0stitches.length).toEqual(5)
        expect(row0stitches[0]).toHaveStyle('background-color: #000')
        expect(row0stitches[1]).toHaveStyle('background-color: #100')
        expect(row0stitches[2]).toHaveStyle('background-color: #200')
        expect(row0stitches[3]).toHaveStyle('background-color: #300')
        expect(row0stitches[4]).toHaveStyle('background-color: #400')
        const row1stitches = swatch.children[1].children;
        expect(row1stitches.length).toEqual(5)
        expect(row1stitches[0]).toHaveStyle('background-color: #500')
        expect(row1stitches[1]).toHaveStyle('background-color: #600')
        expect(row1stitches[2]).toHaveStyle('background-color: #700')
        expect(row1stitches[3]).toHaveStyle('background-color: #800')
        expect(row1stitches[4]).toHaveStyle('background-color: #900')
        const row2stitches = swatch.children[2].children;
        expect(row2stitches.length).toEqual(5)
        expect(row2stitches[0]).toHaveStyle('background-color: #900')
        expect(row2stitches[1]).toHaveStyle('background-color: #000')
        expect(row2stitches[2]).toHaveStyle('background-color: #100')
        expect(row2stitches[3]).toHaveStyle('background-color: #200')
        expect(row2stitches[4]).toHaveStyle('background-color: #300')
      })
    })

    it('renders an unstyled swatch', () => {
      render(
        <Swatch
            {...basicSwatchConfig}
            stitchPattern={StitchPattern.unstyled}
        />
      )
      const swatch = screen.getByTestId("swatch")
      expect(swatch).toHaveClass("unstyled")
      expect(swatch).not.toHaveClass("clustered")
    })

    it('renders a stacked swatch', () => {
      render(
        <Swatch
            {...basicSwatchConfig}
            stitchPattern={StitchPattern.stacked}
        />
      )
      const swatch = screen.getByTestId("swatch")
      expect(swatch).toHaveClass("stacked")
      expect(swatch).not.toHaveClass("clustered")
    })

    it('renders a shell swatch', () => {
      render(
        <Swatch
            {...basicSwatchConfig}
            stitchPattern={StitchPattern.shell}
        />
      )
      const swatch = screen.getByTestId("swatch")
      expect(swatch).toHaveClass("shell")
      expect(swatch).not.toHaveClass("clustered")
    })

    describe('clustered swatches', () => {
      describe('jasmine', () => {
        it('renders a jasmine stitch swatch', () => {
          render(
            <Swatch
              {...basicSwatchConfig}
              stitchPattern={StitchPattern.jasmine}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch).toHaveClass("jasmine")
          expect(swatch).toHaveClass("clustered")
        })
        it('prepends a one stitch cluster and then has clusters of three stitches', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.jasmine}
              stitchesPerRow={4}
              numberOfRows={7}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(7)
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(5)
          const firstRowClusters = swatch.children[0].children
          expect(firstRowClusters[0].children.length, 'first cluster in first row should have one stitch').toEqual(1)
          expect(firstRowClusters[1].children.length, 'second cluster in first row should have three stitches').toEqual(3)
          expect(firstRowClusters[2].children.length, 'cluster should have three stitches').toEqual(3)
          expect(firstRowClusters[3].children.length, 'cluster should have three stitches').toEqual(3)
          expect(firstRowClusters[4].children.length, 'cluster should have three stitches').toEqual(3)
          expect(swatch.children[1].children.length, 'second row should have correct number of clusters').toEqual(5)
          const secondRowClusters = swatch.children[0].children
          expect(secondRowClusters[0].children.length, 'first cluster in row should have one stitch').toEqual(1)
          expect(secondRowClusters[1].children.length, 'second cluster in row should have three stitches').toEqual(3)
          expect(secondRowClusters[2].children.length, 'cluster should have three stitches').toEqual(3)
          expect(secondRowClusters[3].children.length, 'cluster should have three stitches').toEqual(3)
          expect(secondRowClusters[4].children.length, 'cluster should have three stitches').toEqual(3)
          expect(swatch.children[2].children.length, 'third row should have correct number of clusters').toEqual(5)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of clusters').toEqual(5)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('cluster')
          expect(swatch.children[0].children[0].children[0]).toHaveClass('stitch')
        })
        it('properly puts the colors on the stitches when there is a prepended stitch', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
                {color: '#900', length: 1},
              ]}
              stitchPattern={StitchPattern.jasmine}
              stitchesPerRow={2}
              numberOfRows={4}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(3)
          const row0Clusters = swatch.children[0].children
          expect(row0Clusters[0].children[0]).toHaveStyle('background-color: #000')
          expect(row0Clusters[1].children[0]).toHaveStyle('background-color: #100')
          expect(row0Clusters[1].children[1]).toHaveStyle('background-color: #200')
          expect(row0Clusters[1].children[2]).toHaveStyle('background-color: #300')
          expect(row0Clusters[2].children[0]).toHaveStyle('background-color: #400')
          expect(row0Clusters[2].children[1]).toHaveStyle('background-color: #500')
          expect(row0Clusters[2].children[2]).toHaveStyle('background-color: #600')
          const row1Clusters = swatch.children[1].children
          expect(row1Clusters[0].children[0]).toHaveStyle('background-color: #700')
          expect(row1Clusters[1].children[0]).toHaveStyle('background-color: #800')
          expect(row1Clusters[1].children[1]).toHaveStyle('background-color: #900')
          expect(row1Clusters[1].children[2]).toHaveStyle('background-color: #000')
        })
        it('properly puts the colors on the stitches when there is a prepended stitch in strict mode', () => {
          render(
            <StrictMode>
              <Swatch
                colorSequence={[
                  {color: '#aaa', length: 1},
                  {color: '#bbb', length: 1},
                  {color: '#ccc', length: 1},
                  {color: '#ddd', length: 1},
                  {color: '#eee', length: 1},
                ]}
                stitchPattern={StitchPattern.jasmine}
                stitchesPerRow={2}
                numberOfRows={4}
                staggerLengths={false}
              />
              <Swatch
                colorSequence={[
                  {color: '#aaa', length: 1},
                  {color: '#bbb', length: 1},
                  {color: '#ccc', length: 1},
                  {color: '#ddd', length: 1},
                  {color: '#eee', length: 1},
                ]}
                stitchPattern={StitchPattern.jasmine}
                stitchesPerRow={2}
                numberOfRows={4}
                staggerLengths={false}
              />
            </StrictMode>
          )
          const swatches = screen.getAllByTestId("swatch")
          expect(swatches[0].children[0].children[0].children[0]).toHaveStyle('background-color: #aaa')
          expect(swatches[1].children[0].children[0].children[0]).toHaveStyle('background-color: #aaa')
        })
      })

      describe('ripple', () => {
        it('renders a ripple swatch', () => {
          render(
            <Swatch
              {...basicSwatchConfig}
              stitchPattern={StitchPattern.ripple}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch).toHaveClass("ripple")
          expect(swatch).toHaveClass("clustered")
        })

        it('it has clusters of 5 stitches', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.ripple}
              stitchesPerRow={4}
              numberOfRows={7}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(7)
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(4)
          const firstRowClusters = swatch.children[0].children
          expect(firstRowClusters[0].children.length, 'first cluster in first row should have correct number of stitches').toEqual(5)
          expect(firstRowClusters[1].children.length, 'second cluster in first row should have correct number of stitches').toEqual(5)
          expect(firstRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(5)
          expect(firstRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(5)
          expect(swatch.children[1].children.length, 'second row should have correct number of clusters').toEqual(4)
          const secondRowClusters = swatch.children[0].children
          expect(secondRowClusters[0].children.length, 'first cluster in row should have correct number of stitches').toEqual(5)
          expect(secondRowClusters[1].children.length, 'second cluster in row should have correct number of stitches').toEqual(5)
          expect(secondRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(5)
          expect(secondRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(5)
          expect(swatch.children[2].children.length, 'third row should have correct number of clusters').toEqual(4)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of clusters').toEqual(4)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('cluster')
          expect(swatch.children[0].children[0].children[0]).toHaveClass('stitch')
        })
      })

      describe('vstitchCluster', () => {
        it('renders a vstitchCluster swatch', () => {
          render(
            <Swatch
              {...basicSwatchConfig}
              stitchPattern={StitchPattern.vstitchCluster}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch).toHaveClass("vstitchCluster")
          expect(swatch).toHaveClass("clustered")
        })
        it('has clusters of 2 stitches with an appended and prepended one stitch cluster', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.vstitchCluster}
              stitchesPerRow={4}
              numberOfRows={7}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(7)
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(6)
          const firstRowClusters = swatch.children[0].children
          expect(firstRowClusters[0].children.length, 'first cluster in first row should have correct number of stitches').toEqual(1)
          expect(firstRowClusters[1].children.length, 'second cluster in first row should have correct number of stitches').toEqual(2)
          expect(firstRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(firstRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(firstRowClusters[4].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(firstRowClusters[5].children.length, 'cluster should have correct number of stitches').toEqual(1)
          expect(swatch.children[1].children.length, 'second row should have correct number of clusters').toEqual(6)
          const secondRowClusters = swatch.children[0].children
          expect(secondRowClusters[0].children.length, 'first cluster in row should have correct number of stitches').toEqual(1)
          expect(secondRowClusters[1].children.length, 'second cluster in row should have correct number of stitches').toEqual(2)
          expect(secondRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(secondRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(secondRowClusters[4].children.length, 'cluster should have correct number of stitches').toEqual(2)
          expect(secondRowClusters[5].children.length, 'cluster should have correct number of stitches').toEqual(1)
          expect(swatch.children[2].children.length, 'third row should have correct number of clusters').toEqual(6)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of clusters').toEqual(6)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('cluster')
          expect(swatch.children[0].children[0].children[0]).toHaveClass('stitch')
        })
        it('properly puts the colors on the stitches with an appended and prepended stitch', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
                {color: '#900', length: 1},
              ]}
              stitchPattern={StitchPattern.vstitchCluster}
              stitchesPerRow={2}
              numberOfRows={4}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(4)
          const row0Clusters = swatch.children[0].children
          expect(row0Clusters[0].children[0]).toHaveStyle('background-color: #000')
          expect(row0Clusters[1].children[0]).toHaveStyle('background-color: #100')
          expect(row0Clusters[1].children[1]).toHaveStyle('background-color: #200')
          expect(row0Clusters[2].children[0]).toHaveStyle('background-color: #300')
          expect(row0Clusters[2].children[1]).toHaveStyle('background-color: #400')
          expect(row0Clusters[3].children[0]).toHaveStyle('background-color: #500')
          const row1Clusters = swatch.children[1].children
          expect(row1Clusters[0].children[0]).toHaveStyle('background-color: #600')
          expect(row1Clusters[1].children[0]).toHaveStyle('background-color: #700')
          expect(row1Clusters[1].children[1]).toHaveStyle('background-color: #800')
          expect(row1Clusters[2].children[0]).toHaveStyle('background-color: #900')
          expect(row1Clusters[2].children[1]).toHaveStyle('background-color: #000')
        })
      })
      describe('ablockCluster', () => {
        it('renders a ablockCluster swatch', () => {
          render(
            <Swatch
              {...basicSwatchConfig}
              stitchPattern={StitchPattern.ablockCluster}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch).toHaveClass("ablockCluster")
          expect(swatch).toHaveClass("clustered")
        })
        it('has clusters of 4 stitches', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#f00', length: 3},
                {color: '#0f0', length: 2},
              ]}
              stitchPattern={StitchPattern.ablockCluster}
              stitchesPerRow={5}
              numberOfRows={7}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children.length, 'should have correct numberOfRows').toEqual(7)
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(5)
          const firstRowClusters = swatch.children[0].children
          expect(firstRowClusters[0].children.length, 'first cluster in first row should have correct number of stitches').toEqual(4)
          expect(firstRowClusters[1].children.length, 'second cluster in first row should have correct number of stitches').toEqual(4)
          expect(firstRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(4)
          expect(firstRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(4)
          expect(firstRowClusters[4].children.length, 'cluster should have correct number of stitches').toEqual(4)

          expect(swatch.children[1].children.length, 'second row should have correct number of clusters').toEqual(5)
          const secondRowClusters = swatch.children[0].children
          expect(secondRowClusters[0].children.length, 'first cluster in row should have correct number of stitches').toEqual(4)
          expect(secondRowClusters[1].children.length, 'second cluster in row should have correct number of stitches').toEqual(4)
          expect(secondRowClusters[2].children.length, 'cluster should have correct number of stitches').toEqual(4)
          expect(secondRowClusters[3].children.length, 'cluster should have correct number of stitches').toEqual(4)
          expect(secondRowClusters[4].children.length, 'cluster should have correct number of stitches').toEqual(4)
          expect(swatch.children[2].children.length, 'third row should have correct number of clusters').toEqual(5)
          expect(swatch.children[3].children.length, 'fourth row should have correct number of clusters').toEqual(5)

          expect(swatch.children[0]).toHaveClass('crow')
          expect(swatch.children[0].children[0]).toHaveClass('cluster')
          expect(swatch.children[0].children[0].children[0]).toHaveClass('stitch')
        })
        it('properly puts the colors on the stitches', () => {
          render(
            <Swatch
              colorSequence={[
                {color: '#000', length: 1},
                {color: '#100', length: 1},
                {color: '#200', length: 1},
                {color: '#300', length: 1},
                {color: '#400', length: 1},
                {color: '#500', length: 1},
                {color: '#600', length: 1},
                {color: '#700', length: 1},
                {color: '#800', length: 1},
                {color: '#900', length: 1},
              ]}
              stitchPattern={StitchPattern.ablockCluster}
              stitchesPerRow={2}
              numberOfRows={4}
              staggerLengths={false}
            />
          )
          const swatch = screen.getByTestId("swatch")
          expect(swatch.children[0].children.length, 'first row should have correct number of clusters').toEqual(2)
          const row0Clusters = swatch.children[0].children
          expect(row0Clusters[0].children[0]).toHaveStyle('background-color: #000')
          expect(row0Clusters[0].children[1]).toHaveStyle('background-color: #100')
          expect(row0Clusters[0].children[2]).toHaveStyle('background-color: #200')
          expect(row0Clusters[0].children[3]).toHaveStyle('background-color: #300')
          expect(row0Clusters[1].children[0]).toHaveStyle('background-color: #400')
          expect(row0Clusters[1].children[1]).toHaveStyle('background-color: #500')
          expect(row0Clusters[1].children[2]).toHaveStyle('background-color: #600')
          expect(row0Clusters[1].children[3]).toHaveStyle('background-color: #700')
          const row1Clusters = swatch.children[1].children
          expect(row1Clusters[0].children[0]).toHaveStyle('background-color: #800')
          expect(row1Clusters[0].children[1]).toHaveStyle('background-color: #900')
          expect(row1Clusters[0].children[2]).toHaveStyle('background-color: #000')
        })
      })
    })
  })
})
