var canvas;
var ctx;
var stroke = 10;

var imageInput;

window.onload = async function () {

  canvas = document.getElementById("mainCanvas");
  canvas.setAttribute('style', 'background-color:#ffffff');
  imageInput = document.getElementById("inputImage");
  canvas.style.position = 'fixed';

  ctx = canvas.getContext('2d');
  var pos = { x: 0, y: 0 };

  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);

  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY - 50;
  }

  function draw(e) {
    if (e.buttons !== 1) return;

    ctx.beginPath(); // begin

    ctx.lineWidth = parseInt(document.getElementById("inputStroke").value);
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("colorInput").value;

    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
  }
}

function recognizeDraw() {
  Tesseract.recognize(
    canvas.toDataURL("image/png"),
    'eng').then(({ data: { text } }) => {
      document.getElementById("outputText").innerHTML = "<strong> " + text + "</strong>";
    })
}

function recognizeInputImage() {
  document.getElementById("outputText").innerHTML = "<strong>Cargando...</strong>";

  Tesseract.recognize(
    URL.createObjectURL(imageInput.files[0]),
    'eng').then(({ data: { text } }) => {
      document.getElementById("outputText").innerHTML = "<strong> " + text + "</strong>";
    })
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  document.getElementById("outputText").innerHTML = "";
}
