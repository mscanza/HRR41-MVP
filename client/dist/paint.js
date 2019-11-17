$( document ).ready(function() {
  console.log( "ready!" );

let colorsArray = ['black', 'white', 'red', 'blue', 'lime', 'cyan', 'magenta','silver', 'gray','maroon','olive','green','purple','teal','navy', 'aliceblue', 'dodgerblue', 'bisque', 'blueviolet','aquamarine', 'chartreuse','chocolate','coral','cornflowerblue','crimson', 'darkorange','darkseagreen','deeppink', 'dimgray','gold','goldenrod','greenyellow','indigo','ivory','khaki']
let colorTimer = 25;
let strokeList = [];
let colorPosition = 0;
let brushColor = 'black';
let brushStatus = document.getElementById('brushStatus');
let body = document.getElementsByTagName('body')[0];
let square = document.getElementById('square');
let circle = document.getElementById('circle');
let colors = document.getElementById('colors');
let swatch = document.getElementById('swatch');
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let canvas = document.getElementById("canvas");


for (let i = 0; i < colorsArray.length; i++) {
let div = document.createElement('div');
div.classList.add('eachColor');
div.style.left = colorPosition + 'px';
colorPosition += 15;
div.style.backgroundColor = colorsArray[i];
window.setTimeout(function(){
  colors.append(div)
}, colorTimer)
colorTimer += 50;
}


brushStatus.style.opacity = '0.2';


let swatchWidth = 10;
let swatchHeight = 10;

swatch.style.width = swatchWidth + 'px';
swatch.style.height = swatchHeight + 'px';
swatch.style.borderRadius = '50%';
swatch.style.backgroundColor = brushColor;

square.addEventListener('click', function(){
square.style.border = '2px solid mediumSlateBlue';
square.style.top = '31px';
circle.style.border = 'none';
circle.style.top = '33px';
swatch.style.borderRadius = '0px';
})

circle.addEventListener('click', function(){
circle.style.border = '2px solid mediumSlateBlue';
circle.style.top = '31px';
square.style.border = 'none';
square.style.top = '33px';
swatch.style.borderRadius = '50%';
})

plus.addEventListener('click',function(){
if (swatchWidth <= 20) {
    swatchWidth += 2;
swatchHeight += 2;
swatch.style.width = swatchWidth + 'px';
swatch.style.height = swatchHeight + 'px';
}

})
minus.addEventListener('click',function(){
if (swatchWidth > 2) {
    swatchWidth -= 2;
swatchHeight -= 2;
swatch.style.width = swatchWidth + 'px';
swatch.style.height = swatchHeight + 'px';
}

})



let toggler = false;

let myListener = function(event) {
if (event.clientY <= 100) {
  return;
}
brushStatus.style.opacity = '1'
let stroke = document.createElement('div');
stroke.classList.add('stroke');
stroke.style.width = swatchWidth + 'px';
stroke.style.height = swatchHeight + 'px';
stroke.style.backgroundColor = brushColor;
stroke.style.position = 'absolute';
stroke.style.borderRadius = swatch.style.borderRadius;
stroke.style.left = event.clientX + 'px';
stroke.style.top = event.clientY + 'px';
    if (event.clientY <= 200) {
      stroke.style.display = 'none';
    }
canvas.append(stroke)
  }
document.addEventListener('click', function(e){
if (e.target.classList.value.includes('eachColor')) {

 for (let i = 0; i < colorsArray.length; i++) {
  let item =  document.getElementsByClassName('eachColor')[i];
   item.style.border = 'none';
   item.style.top = '0px';
   item.style.width = '15px';
   item.style.zIndex = '0';
 }

 e.target.style.border = '2px solid mediumSlateBlue';
 e.target.style.top = '-2px';
 e.target.style.width = '18px';
 e.target.style.zIndex = '1';
 brushColor = e.target.style.backgroundColor;
 swatch.style.backgroundColor = brushColor;
}
if (toggler) {
  brushStatus.style.opacity = '0.2'
  document.removeEventListener('mousemove', myListener)
  toggler = false;
  return;
} else if (event.clientY <= 200){
  return;
} else {
toggler = true;
    document.addEventListener('mousemove', myListener)

}
})

function savePainting() {

strokeList = $('#canvas').children();

}
function appendStrokes() {
console.log(strokeList)
$('#canvas').html('');
for (let i = 1; i < strokeList.length; i++) {
$('#canvas').append(strokeList[i]);
}
}
document.getElementById('back').addEventListener('click', appendStrokes);
document.getElementById('save').addEventListener('click', savePainting);

});