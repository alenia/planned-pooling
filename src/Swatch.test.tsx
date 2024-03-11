import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StitchPattern, SwatchConfig, ColorSequenceArray } from './types'
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
  describe('unclustered swatches', () => {
    describe('moss stitch', () => {
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
        expect(screen.getAllByTestId("swatch").length).toEqual(1)
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
          expect(swatch.children[2].children.length, 'first row should have correct number of stitches').toEqual(5)
          expect(swatch.children[3].children.length, 'second row should have correct number of stitches').toEqual(5)

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
          expect(swatch.children[2].children.length, 'second row should have correct number of stitches').toEqual(6)
          expect(swatch.children[3].children.length, 'second row should have correct number of stitches').toEqual(5)

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

    describe('clustered swatches', () => {
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
    })
  })
})
