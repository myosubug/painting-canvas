const canvas = document.getElementById("js-canvas");

function onMouseMove(event){
    console.log("moving!!!!");
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
}