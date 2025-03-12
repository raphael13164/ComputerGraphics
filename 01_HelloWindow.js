// Global constants
const canvas = document.getElementById('glCanvas'); // Get the canvas element 
const gl = canvas.getContext('webgl2'); // Get the WebGL2 context

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size: 현재 window 전체를 canvas로 사용
canvas.width = 500;
canvas.height = 500;

let min = Math.min(canvas.width, canvas.height);
let halfWidth = min / 2;
let halfHeight = min / 2;

// Initialize WebGL settings: viewport and clear color
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.1, 0.2, 0.3, 1.0);

gl.enable(gl.SCISSOR_TEST)

// Start rendering
render();

// Render loop
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);  

    // Draw something here
    gl.viewport(0, 0, halfWidth, halfHeight);
    gl.scissor(0, 0, halfWidth, halfHeight);
    gl.clearColor(0.184, 0.431, 0.729, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    gl.viewport(0, halfHeight, halfWidth, canvas.Height);
    gl.scissor(0, halfHeight, halfWidth, halfHeight);
    gl.clearColor(1, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(halfWidth, 0, canvas.width, halfHeight);
    gl.scissor(halfWidth, 0, halfWidth, halfHeight);
    gl.clearColor(1.0, 1.0, 0.329, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(halfWidth, halfHeight, canvas.width, canvas.Height);
    gl.scissor(halfWidth, halfHeight, halfWidth, halfHeight);
    gl.clearColor(0.306, 0.678, 0.357, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// Resize viewport when window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    min = Math.min(window.innerWidth, window.innerHeight);
    halfWidth = min / 2;
    halfHeight = min / 2;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});