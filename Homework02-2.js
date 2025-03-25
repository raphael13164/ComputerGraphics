// Homework02-2.js

let gl;
let program;
let positionBuffer;
let positionLocation;
let translationLocation;

let x = 0.0;
let y = 0.0;
const step = 0.01;
const squareSize = 0.2;

const canvas = document.getElementById("glCanvas");
canvas.width = 600;
canvas.height = 600;

initGL();
initBuffers();
await initShaders();
drawScene();
resizeAspectRatio();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (y + squareSize / 2 + step <= 1.0) y += step;
      break;
    case "ArrowDown":
      if (y - squareSize / 2 - step >= -1.0) y -= step;
      break;
    case "ArrowLeft":
      if (x - squareSize / 2 - step >= -1.0) x -= step;
      break;
    case "ArrowRight":
      if (x + squareSize / 2 + step <= 1.0) x += step;
      break;
  }
  drawScene();
});

function initGL() {
  gl = canvas.getContext("webgl");
  if (!gl) {
    alert("WebGL not supported");
    return;
  }
}

function initBuffers() {
  positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertices = [
    -0.1, -0.1,
     0.1, -0.1,
     0.1,  0.1,
    -0.1,  0.1
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

async function initShaders() {
  const vsSource = await fetch('vertex.glsl').then(res => res.text());
  const fsSource = await fetch('fragment.glsl').then(res => res.text());

  const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);
  positionLocation = gl.getAttribLocation(program, 'a_position');
  translationLocation = gl.getUniformLocation(program, 'u_translation');
}

function loadShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function drawScene() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2f(translationLocation, x, y);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function resizeAspectRatio() {
  const aspect = 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (width / height > aspect) {
    width = height * aspect;
  } else {
    height = width / aspect;
  }

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
} 