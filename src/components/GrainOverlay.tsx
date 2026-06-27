import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float uTime;
uniform float uIntensity;
uniform vec2 uViewportRes;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * uViewportRes;
  float grain = 0.0;

  vec2 i2 = floor(uv + dot(uv, vec2(0.3333333)));
  vec2 f2 = uv - i2 + dot(i2, vec2(0.1666667));

  vec2 i = step(f2.yx, f2);
  vec2 i1 = (1.0 - i) * step(f2.yx, vec2(0.0));

  vec2 p0 = uv - i2 + dot(i2, vec2(0.1666667));
  vec2 p1 = uv - i2 - i1 + vec2(0.1666667);
  vec2 p2 = uv - i2 - i + vec2(0.3333333);

  vec4 w = 0.5 - vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), 0.0);
  w = max(w, vec4(0.0, 0.0, 0.0, 0.0));
  w *= w;

  vec4 d = fract(sin(vec4(
    dot(i2 + vec2(0.0, 0.0), vec2(0.3183099, 0.3678794)),
    dot(i2 + i1, vec2(0.3183099, 0.3678794)),
    dot(i2 + i, vec2(0.3183099, 0.3678794)),
    0.0
  )) * 17.0) + uTime * uIntensity;

  vec4 h = d - sin(d) * cos(d).xxyy * vec4(0.0, 1.0, 0.0, 1.0);
  h = (h - 0.5) / w.wzyz;
  h *= h;

  grain += sqrt(w.x) * h.x;
  grain += sqrt(w.y) * h.z;
  grain += sqrt(w.z) * h.y;

  gl_FragColor = vec4(vec3(grain * 0.025 + 0.5), 1.0);
}
`;

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let time = 0;
    let intensity = 0.075;
    let speed = 0.5;

    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false });
      if (!gl) return;

      const dpr = Math.min(window.devicePixelRatio, 2);

      function resize() {
        if (!gl || !canvas) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uViewportResLoc !== null) {
          gl.uniform2f(uViewportResLoc, w * dpr, h * dpr);
        }
      }

      function createShader(type: number, source: string) {
        if (!gl) return null;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      }

      const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vertShader || !fragShader) return;

      program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
      const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      const uvLoc = gl.getAttribLocation(program, 'uv');
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

      const uTimeLoc = gl.getUniformLocation(program, 'uTime');
      const uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');
      const uViewportResLoc = gl.getUniformLocation(program, 'uViewportRes');

      gl.uniform1f(uIntensityLoc, intensity);

      resize();

      function render() {
        if (!gl || !program) return;
        time += 0.016 * speed;
        gl.uniform1f(uTimeLoc, time);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        animId = requestAnimationFrame(render);
      }

      render();

      const onResize = () => resize();
      window.addEventListener('resize', onResize);

      rendererRef.current = { stop: () => cancelAnimationFrame(animId) };

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animId);
      };
    } catch {
      return;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.06,
      }}
      aria-hidden="true"
    />
  );
}
