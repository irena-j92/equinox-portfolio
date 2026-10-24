import { useEffect, useRef } from "react";
import * as THREE from "three";

// A depth-inspired 2.5D landscape: the artwork remains available when WebGL is not.
const vertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uImageAspect;
  uniform float uTime;
  uniform float uScroll;
  uniform float uMotion;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
  }
  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 cover = vec2(min(aspect/uImageAspect,1.0), min(uImageAspect/aspect,1.0));
    vec2 uv = (vUv - 0.5) * cover * 0.97 + 0.5;
    float water = exp(-pow((uv.y-0.32)*10.0,2.0)) * smoothstep(0.35,0.65,uv.x);
    float foreground = pow(1.0-uv.y,3.0);
    uv += uPointer * (0.003 + foreground * 0.008) * uMotion;
    uv.x += sin(uv.y * 90.0 + uTime * 0.6) * water * 0.0007 * uMotion;
    uv.y += uScroll * 0.012 * uMotion;
    vec4 scene = texture2D(uImage, uv);
    float mist = noise(vec2(uv.x*8.0-uTime*0.03,uv.y*13.0));
    float horizon = exp(-pow((uv.y-0.46)*14.0,2.0));
    scene.rgb = mix(scene.rgb,vec3(0.88,0.82,0.70),horizon*mist*0.055*uMotion);
    for(int i=0; i<9; i++) {
      float fi = float(i);
      vec2 p = vec2(hash(vec2(fi,9.1)),0.25+hash(vec2(fi,4.3))*0.5);
      p.y += sin(uTime*0.22+fi)*0.016*uMotion;
      p.x += sin(uTime*0.12+fi*0.7)*0.012*uMotion;
      vec2 d = (uv-p)*vec2(1.0,0.65);
      float glint = exp(-(abs(d.x)*500.0+abs(d.y)*1300.0)) + exp(-(abs(d.x)*1700.0+abs(d.y)*450.0));
      float blink = pow(0.5+0.5*sin(uTime*0.7+fi*3.0),5.0);
      scene.rgb += vec3(1.0,0.8,0.45)*glint*blink*0.33*uMotion;
    }
    gl_FragColor = scene;
    #include <colorspace_fragment>
  }
`;

export default function Landscape({ motion }) {
  const host = useRef(null);
  const enabled = useRef(motion);
  const invalidate = useRef(() => {});
  useEffect(() => {
    enabled.current = motion;
    invalidate.current();
  }, [motion]);

  useEffect(() => {
    const container = host.current;
    const hero = container.closest(".hero");
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const target = new THREE.Vector2();
    const uniforms = {
      uImage: { value: null },
      uImageAspect: { value: 1672 / 941 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMotion: { value: enabled.current ? 1 : 0 },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));
    let texture,
      frame = 0,
      disposed = false,
      loaded = false,
      visible = true,
      lastTime = 0;
    const draw = (now) => {
      frame = 0;
      if (disposed || !loaded || !visible || document.hidden) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      uniforms.uMotion.value = enabled.current ? 1 : 0;
      if (enabled.current) {
        uniforms.uTime.value += dt;
        uniforms.uPointer.value.lerp(target, 0.06);
        uniforms.uScroll.value = Math.min(
          window.scrollY / Math.max(hero.offsetHeight, 1),
          1,
        );
      }
      renderer.render(scene, camera);
      if (enabled.current) frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!frame && !disposed) {
        lastTime = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    invalidate.current = wake;
    const loader = new THREE.TextureLoader();
    texture = loader.load(
      "/assets/oasis.webp",
      (image) => {
        if (disposed) {
          image.dispose();
          return;
        }
        image.colorSpace = THREE.SRGBColorSpace;
        uniforms.uImage.value = image;
        uniforms.uImageAspect.value = image.image.width / image.image.height;
        loaded = true;
        container.classList.add("is-ready");
        wake();
      },
      undefined,
      () => {
        container.style.opacity = "0";
      },
    );
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      uniforms.uResolution.value.set(Math.max(1, width), Math.max(1, height));
      wake();
    };
    const pointer = (event) => {
      const rect = hero.getBoundingClientRect();
      target.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };
    const resetPointer = () => target.set(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) wake();
      },
      { rootMargin: "100px" },
    );
    observer.observe(hero);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(container);
    hero.addEventListener("pointermove", pointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", wake);
    const lost = (event) => {
      event.preventDefault();
      loaded = false;
      container.classList.remove("is-ready");
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      hero.removeEventListener("pointermove", pointer);
      hero.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", wake);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      invalidate.current = () => {};
    };
  }, []);
  return <div className="webgl-landscape" ref={host} />;
}
