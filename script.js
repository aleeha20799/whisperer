// Elements
const uploadBtn       = document.getElementById('upload-btn');
const imageUpload     = document.getElementById('image-upload');
const generateBtn     = document.getElementById('generate-btn');
const downloadBtn     = document.getElementById('download-btn');
const canvasWrapper   = document.getElementById('canvas-wrapper');
const canvas          = document.getElementById('canvas');
const ctx             = canvas.getContext('2d');
const textInput       = document.getElementById('text-input');
const fontSizeInput   = document.getElementById('font-size');
const textColorInput  = document.getElementById('text-color');
const outlineCheckbox = document.getElementById('outline');
const outlineColorIn  = document.getElementById('outline-color');
const thankYou        = document.getElementById('thank-you');
const heartContainer  = document.getElementById('hearts-container');

let uploadedImage = null;

uploadBtn.addEventListener('click', () => imageUpload.click());
imageUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      canvas.width  = img.width;
      canvas.height = img.height;
      canvasWrapper.style.display = 'block';
      drawCanvas();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

[textInput, fontSizeInput, textColorInput, outlineCheckbox, outlineColorIn].forEach(el => {
  el.addEventListener('input', () => {
    if (uploadedImage) drawCanvas();
  });
});

generateBtn.addEventListener('click', () => {
  if (!uploadedImage) return alert('Upload an image first!');
  drawCanvas();
  downloadBtn.style.display = 'inline-block';
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'whispered-image.png';
  link.href = canvas.toDataURL();
  link.click();
  thankYou.style.display = 'block';
  setTimeout(() => thankYou.style.display = 'none', 4000);
});

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  const txt  = textInput.value;
  const size = parseInt(fontSizeInput.value);
  ctx.font          = `bold ${size}px Comic Sans MS`;
  ctx.textAlign     = 'center';
  ctx.textBaseline  = 'middle';
  ctx.fillStyle     = textColorInput.value;

  const x = canvas.width  / 2;
  const y = canvas.height / 2;

  if (outlineCheckbox.checked) {
    ctx.lineWidth   = Math.floor(size / 8);
    ctx.strokeStyle = outlineColorIn.value;
    ctx.strokeText(txt, x, y);
  }
  ctx.fillText(txt, x, y);
}

for (let i = 0; i < 30; i++) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '🤍';
  heart.style.left             = `${Math.random()*100}vw`;
  heart.style.animationDuration= `${5 + Math.random()*5}s`;
  heart.style.fontSize         = `${20 + Math.random()*20}px`;
  heart.style.animationDelay   = `${Math.random()*5}s`;
  heartContainer.appendChild(heart);
}
