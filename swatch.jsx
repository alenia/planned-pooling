import React from 'react';
import { paintStitches } from './color.js'
const clusterMap = { jasmine: 3, ripple: 5, vstitchCluster: 2, ablockCluster: 4}


function Crow (props) {
  return <div className="crow">{props.children}</div>
}

function Stitch ({color}) {
  return <div className="stitch" style={{backgroundColor: color}}/>
}

export function buildSwatch({ colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false}) {
  let cont = ""
  const clusterLength = clusterMap[stitchPattern];

  return [...Array(crows)].map((e, i) => (
    <Crow key={i}>
    {
      [...Array(crowLength)].map((f,j) => <Stitch key={j}/>)
    }
    </Crow>)
   )
//
   // Make clusters when there are clusters
   // stagger lengths when they are staggered
   //
  //if(clusterLength) {
    //for (var i = 0; i < crows; i++) {
      //cont += ('<div class="crow">');
      //if(stitchPattern === "jasmine" || stitchPattern === "vstitchCluster") { //TODO: move this to config
        //cont += '<div class="cluster"><div class="stitch"></div></div>';
      //}
      //cont += `<div class="cluster">${('<div class="stitch"></div>').repeat(clusterLength)}</div>`.repeat(crowLength);
      //if(stitchPattern === "vstitchCluster") { //TODO: move this to config
        //cont += '<div class="cluster"><div class="stitch"></div></div>';
      //}
      //cont += ('</div>');
    //}
  //}
  //else {
    //if(staggerLengths) {
      //for (var i = 0; i < crows; i++) {
        //let repeatLength = (i % 2 === 1) ? crowLength : crowLength + 1;
        //cont += ('<div class="crow">');
        //cont += (`<div class="stitch"></div>`).repeat(repeatLength);
        //cont += ('</div>');
      //}
    //} else {
      //cont = `<div class="crow">${(`<div class="stitch"></div>`).repeat(crowLength)}</div>`.repeat(crows)
    //}
  //}
  //return cont
}


function Swatch({ colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0, staggerLengths = false, className}) {
  const clusterLength = clusterMap[stitchPattern];
  console.log('clusterLength', clusterLength, 'stitchPattern', stitchPattern);
  const swatch = (<div className={`${className} swatch ${stitchPattern} ${clusterLength ? 'clustered' : ''}`}>
                  {buildSwatch({ colorConfig, crowLength, stitchPattern, crows, colorShift, staggerLengths})}
                 </div>);
                 console.log(swatch)
                 //TODO: Paint these stitches. Filter out my nodes so it's just the Stitches
  //paintStitches(swatch, colorConfig, { colorShift } );
  return swatch
}

export default Swatch
