"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MAX_DPR = 2;

const VERTEX_SHADER = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`;

const FIELD_SHADER = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;
out vec4 o;

const float LAYERS = 86.0;
const float GAIN = 0.480;
const vec2 CENTRE = vec2(-0.25, 0.56);
const float TILT = 1.4;
const float ZOOM = 1.05;
const float THETA = 2.13;
const float SHEAR = 0.965;
const float SHRINK = 0.957;
const vec2 WARP_FREQ = vec2(0.45, 2.5);
const vec2 WARP_AMP = vec2(0.13, 0.028);
const vec2 ASPECT = vec2(2.2, 0.18);
const float OFFSET = 0.37;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 23.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;
  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));
  vec3 col = vec3(0.0);

  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }

  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`;

const FINISH_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform float uCell;
uniform float uPR;
out vec4 o;

const float PI = 3.14159265359;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
const float TURN = 0.3200;
const float SWELL = 1.1000;
const float REST = 0.4200;
const float CAP = 0.5500;

float ign(vec2 p, float f) {
  p += 5.588238 * mod(f, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

vec3 scene(vec2 uv) { return max(texture(uField, clamp(uv, 0.0, 1.0)).rgb, 0.0); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  mat2 turn = mat2(cos(TURN), -sin(TURN), sin(TURN), cos(TURN));
  vec2 rp = turn * frag;
  vec2 c = (floor(rp / uCell) + 0.5) * uCell;
  vec2 src = transpose(turn) * c;
  vec3 soft = scene(uv);
  vec3 ink = scene(src / uRes);
  float lvl = clamp(dot(ink, LUMA), 0.0, 1.0);
  float radius = uCell * sqrt(pow(lvl, 0.9) / PI);
  float presence = smoothstep(0.03, 0.16, lvl) * REST;

  if (uOn > 0.0) {
    vec2 d = (src - uMouse) / uReach;
    float w = uOn * exp(-dot(d, d));
    if (w > 1e-4) {
      radius *= 1.0 + SWELL * w;
      presence = mix(presence, 1.0, min(w, 1.0));
    }
  }

  radius = min(radius, uCell * CAP);
  float aa = 0.7 * uPR;
  float dm = 1.0 - smoothstep(radius - aa, radius + aa, length(rp - c));
  vec3 dots = ink * min(0.8 / max(lvl, 1e-3), 2.2) * dm;
  vec3 L = mix(soft, dots, presence);
  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

type Uniforms = Record<string, WebGLUniformLocation | null>;

function compileProgram(gl: WebGL2RenderingContext, fragment: string) {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("HalftoneBloom shader:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  const pixel = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vertex || !pixel) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, pixel);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(pixel);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("HalftoneBloom link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram, names: string[]) {
  return names.reduce<Uniforms>((uniforms, name) => {
    uniforms[name] = gl.getUniformLocation(program, name);
    return uniforms;
  }, {});
}

export function HalftoneBloom({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || navigator.userAgent.includes("jsdom")) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false });
    if (!gl) return;
    const fieldProgram = compileProgram(gl, FIELD_SHADER);
    const finishProgram = compileProgram(gl, FINISH_SHADER);
    if (!fieldProgram || !finishProgram) return;

    const fieldUniforms = getUniforms(gl, fieldProgram, ["uRes", "uTime", "uC1", "uC2", "uSize", "uAngle"]);
    const finishUniforms = getUniforms(gl, finishProgram, ["uField", "uRes", "uTime", "uBg", "uPaper", "uMouse", "uOn", "uReach", "uCell", "uPR"]);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const framebuffer = gl.createFramebuffer();
    let texture: WebGLTexture | null = null;
    let textureWidth = 0;
    let textureHeight = 0;
    let useHalfFloat = Boolean(gl.getExtension("EXT_color_buffer_float"));
    let frame = 0;
    let previous = -1;
    let clock = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerInside = false;
    let pointerAmount = 0;

    const resizeTarget = (width: number, height: number) => {
      if (width === textureWidth && height === textureHeight && texture) return;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        if (texture) gl.deleteTexture(texture);
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, useHalfFloat ? gl.RGBA16F : gl.RGBA8, width, height, 0, gl.RGBA, useHalfFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (complete || !useHalfFloat) break;
        useHalfFloat = false;
      }
      textureWidth = width;
      textureHeight = height;
    };

    const trackPointer = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      pointerInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    };

    const clearPointer = (event: PointerEvent) => {
      if (!event.relatedTarget) pointerInside = false;
    };

    const render = (now: number) => {
      frame = window.requestAnimationFrame(render);
      const delta = previous < 0 ? 0 : Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!reducedMotion) clock = (clock + delta * 0.45) % 3600;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      const bufferWidth = Math.max(1, Math.round(width * dpr));
      const bufferHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
      }
      resizeTarget(Math.max(1, Math.round(bufferWidth / 2)), Math.max(1, Math.round(bufferHeight / 2)));

      const present = pointerInside && !reducedMotion ? 1 : 0;
      if (present && pointerAmount < 0.02) {
        mouseX = targetX;
        mouseY = targetY;
      }
      pointerAmount += (present - pointerAmount) * (1 - Math.exp(-delta * 5));
      const pointerEase = 1 - Math.exp(-delta * 16);
      mouseX += (targetX - mouseX) * pointerEase;
      mouseY += (targetY - mouseY) * pointerEase;

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.useProgram(fieldProgram);
      gl.uniform2f(fieldUniforms.uRes, textureWidth, textureHeight);
      gl.uniform1f(fieldUniforms.uTime, clock);
      gl.uniform3f(fieldUniforms.uC1, 21 / 255, 55 / 255, 1);
      gl.uniform3f(fieldUniforms.uC2, 92 / 255, 118 / 255, 1);
      gl.uniform1f(fieldUniforms.uSize, 2);
      gl.uniform1f(fieldUniforms.uAngle, Math.PI);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, bufferWidth, bufferHeight);
      gl.useProgram(finishProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(finishUniforms.uField, 0);
      gl.uniform2f(finishUniforms.uRes, bufferWidth, bufferHeight);
      gl.uniform1f(finishUniforms.uTime, clock);
      gl.uniform3f(finishUniforms.uBg, 1, 1, 1);
      gl.uniform1f(finishUniforms.uPaper, 1);
      gl.uniform2f(finishUniforms.uMouse, mouseX * dpr, (height - mouseY) * dpr);
      gl.uniform1f(finishUniforms.uOn, pointerAmount * 0.8);
      gl.uniform1f(finishUniforms.uReach, 429 * dpr);
      gl.uniform1f(finishUniforms.uCell, 6 * dpr);
      gl.uniform1f(finishUniforms.uPR, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("pointerdown", trackPointer, { passive: true });
    document.addEventListener("pointerout", clearPointer);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("pointerdown", trackPointer);
      document.removeEventListener("pointerout", clearPointer);
      if (texture) gl.deleteTexture(texture);
      gl.deleteFramebuffer(framebuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(fieldProgram);
      gl.deleteProgram(finishProgram);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} aria-hidden="true" className={`absolute inset-0 overflow-hidden bg-white ${className}`}>
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
