console.log("Hello");
const colorpicker = document.getElementById("colorPicker");
const background = document.getElementById("background");
const textsize = document.getElementById("textsize");
const canvas = document.getElementById("myCanvas");
const clear = document.getElementById("clearbutton");
const save = document.getElementById("savebutton");
const retrieve = document.getElementById("retrievebutton");

const cxt = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorpicker.addEventListener("change", (e) => {
  cxt.strokeStyle = e.target.value;
  cxt.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    cxt.beginPath();
    cxt.moveTo(lastX, lastY);
    cxt.lineTo(e.offsetX, e.offsetY);
    cxt.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

background.addEventListener("change", (e) => {
  cxt.fillStyle = e.target.value;
  cxt.fillRect(0, 0, 800, 500);
});

textsize.addEventListener("change", (e) => {
  cxt.lineWidth = e.target.value;
});

clear.addEventListener("click", () => {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());

  let link = document.createElement("a");

  link.download = "my-canvas.png";

  link.href = canvas.toDataURL();

  link.click();
});

retrieve.addEventListener("click", () => {
  let canvasData = localStorage.getItem("canvasContents");

  if (canvasData) {
    let img = new Image();
    img.src = canvasData;
    img.onload = () => {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
      cxt.drawImage(img, 0, 0);
    };
  }
});
