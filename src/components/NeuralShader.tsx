import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define PI 3.14159265359

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x_) - 0.5;
  vec3 ox = floor(x_ + 0.5);
  vec3 a0 = x_ - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  
  float t = time * 0.15;
  
  float n1 = snoise(uv * 3.0 + t);
  float n2 = snoise(uv * 5.0 - t * 0.7);
  float n3 = snoise(uv * 8.0 + t * 1.3);
  
  float nodePattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  nodePattern = smoothstep(0.3, 0.7, nodePattern);
  
  float lineNoise = snoise(uv * 12.0 + vec2(t, -t));
  float lines = smoothstep(0.45, 0.55, lineNoise) * 0.3;
  
  vec2 mouseUV = mouse / resolution;
  float mouseDist = distance(uv * aspect, mouseUV * aspect);
  float mouseGlow = exp(-mouseDist * 8.0) * 0.4;
  
  vec3 white = vec3(1.0);
  vec3 baseColor = white;
  
  float intensity = nodePattern * 0.6 + lines + mouseGlow;
  
  float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.5);
  
  vec3 color = baseColor * intensity * vignette;

  color += white * 0.03 * vignette;
  
  float alpha = min(intensity * vignette * 2.0, 0.9);
  gl_FragColor = vec4(color, alpha);
}
`;

export default function NeuralShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create full-screen triangle
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 3, -1, -1, 3
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const mouseLocation = gl.getUniformLocation(program, 'mouse');

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr * 0.5;
      canvas.height = rect.height * dpr * 0.5;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / rect.width * canvas.width;
      targetMouseRef.current.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Intersection observer for pausing
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Render loop
    const render = () => {
      if (visibleRef.current) {
        // Lerp mouse
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

        gl.uniform1f(timeLocation, performance.now() * 0.001);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);

        gl.clearColor(0.012, 0.012, 0.016, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
