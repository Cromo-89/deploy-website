"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-screen WebGL "liquid aurora" — a single shader plane whose fragment
// shader layers simplex noise over time to produce a slow, organic flow of
// color hugging the edges of the frame (reference: neuform.ai's hero shader).
// Kept strictly within Deploy's blue accent — no second hue — per the brand
// rule of "blue punctuates, it doesn't fill." Desktop-only: gated by the
// parent (HeroBackground) via useRichMotion, so mobile keeps the cheap CSS glow.

const VERTEX = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  // Ashima/webgl-noise 2D simplex noise (MIT) — the standard building block
  // for organic flow fields, not proprietary to any one site.
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  float fbm(vec2 p){
    float v=0.0;
    float a=0.5;
    for(int i=0;i<3;i++){
      v+=a*snoise(p);
      p*=1.8;
      a*=0.5;
    }
    return v;
  }

  void main(){
    vec2 uv=gl_FragCoord.xy/uResolution.xy;
    vec2 aspect=vec2(uResolution.x/uResolution.y,1.0);
    vec2 p=(uv-0.5)*aspect;

    float t=uTime*0.035;
    float n=fbm(p*1.1+vec2(t,-t*0.7));

    // Push density toward the edges/corners, keep a large calm center so the
    // headline stays readable — mirrors the radial mask used elsewhere on Deploy.
    float edge=smoothstep(0.32,0.95,length(p));
    float density=clamp(n*0.5+0.5,0.0,1.0)*edge;

    // Deploy's blue family only: near-black canvas -> brand blue -> bright blue.
    vec3 canvas=vec3(0.039,0.039,0.043);
    vec3 blue=vec3(0.137,0.459,0.843);
    vec3 blueBright=vec3(0.231,0.545,0.937);

    vec3 col=mix(canvas,blue,smoothstep(0.2,0.6,density));
    col=mix(col,blueBright,smoothstep(0.65,0.98,density));

    float alpha=density*0.7;
    gl_FragColor=vec4(col,alpha);
  }
`;

export function HeroShader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      uniforms.uTime.value = (now - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [filter:blur(18px)]"
    />
  );
}
