const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const range = document.getElementById("range");
const mode = document.getElementById("mode");
const reset = document.getElementById("reset");
const save = document.getElementById("save");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "##2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "##2c2c2c";;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleWidthChange(event){
    const width = event.target.value;
    ctx.lineWidth = width;
}

function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, 700, 700);
    } 
}

function handleResetClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 700);
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSaveRequest(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "yourdrawing";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColorClick)); 

if(range){
    range.addEventListener("input", handleWidthChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(reset){
    reset.addEventListener("click", handleResetClick);
}

if(save){
    save.addEventListener("click", handleSaveRequest);
}