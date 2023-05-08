import './style.scss'

let manyDivs = ""
for (var i = 0; i <= 500; i++) {
      manyDivs += ('<div></div>');
    }
document.querySelector('#app').innerHTML = `
<p>Adjust the variables in the SCSS in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div class="containerA colorRepeater">
${manyDivs}
</div>
<div class="containerB colorRepeater">
${manyDivs}
</div>
`
