import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { HERO_VIDEO_CONFIG } from '../data/siteData';

interface RippleSlot {
  x: number;
  y: number;
  startTime: number;
  active: boolean;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  varying vec2 v_uv;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_mediaResolution;
  uniform float u_time;

  // Up to 5 overlapping ripples: xy = normalized center, z = age in seconds, w = active (1.0 or 0.0)
  uniform vec4 u_ripples[5];

  // Pointer-hold liquid glass lens & gentle desktop hover distortion
  uniform vec2 u_pointer;
  uniform float u_lensStrength;
  uniform float u_hoverStrength;

  // Cover-fit UV calculation with upper-right subject focal alignment
  // Keeps the subject's face in the upper-right visual area without cropping her head
  vec2 getCoverUV(vec2 uv, vec2 canvasRes, vec2 mediaRes) {
    float canvasAspect = canvasRes.x / max(canvasRes.y, 1.0);
    float mediaAspect = mediaRes.x / max(mediaRes.y, 1.0);
    vec2 scale = vec2(1.0);
    if (canvasAspect > mediaAspect) {
      scale.y = mediaAspect / canvasAspect;
    } else {
      scale.x = canvasAspect / mediaAspect;
    }
    // Anchor vertical focal point near upper third (0.22) so the head/face is never cropped at the top,
    // and shift horizontal focal point slightly so the subject sits comfortably to the right of the text column.
    vec2 anchor = vec2(0.42, 0.22);
    return (uv - anchor) * scale + vec2(0.50, 0.22);
  }

  void main() {
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 aspectScale = vec2(aspect, 1.0);

    vec2 totalOffset = vec2(0.0);
    float totalSpecular = 0.0;
    float totalChroma = 0.0;

    // 1. Process up to 5 concurrent expanding liquid-glass ripples
    for (int i = 0; i < 5; i++) {
      vec4 r = u_ripples[i];
      if (r.w > 0.5) {
        float age = r.z;
        float duration = 1.45;
        if (age >= 0.0 && age < duration) {
          float progress = age / duration;
          // Cubic ease-out decay
          float decay = pow(1.0 - progress, 2.2);

          vec2 delta = (v_uv - r.xy) * aspectScale;
          float dist = length(delta);
          vec2 dir = dist > 0.0001 ? delta / dist : vec2(0.0);

          // Wave travels outward at ~0.72 screen-heights per second
          float radius = age * 0.72;
          float bandWidth = 0.095;
          float distFromRing = dist - radius;

          // Gaussian envelope around the traveling wave ring
          float envelope = exp(-(distFromRing * distFromRing) / (2.0 * bandWidth * bandWidth));
          float wavePhase = distFromRing * 44.0 - age * 14.0;
          float wave = sin(wavePhase) * envelope * decay;

          // Amplitude ~ 3.2% of screen with smooth refraction
          float amplitude = 0.032;
          totalOffset += dir * wave * amplitude;

          // Specular highlight along the outer wave crest
          float crest = max(0.0, cos(wavePhase)) * envelope * decay;
          totalSpecular += crest * 0.14;
          totalChroma += abs(wave) * 0.0045;
        }
      }
    }

    // 2. Process Pointer-Hold Liquid Glass Magnifying Lens + Gentle Desktop Hover
    vec2 ptrDelta = (v_uv - u_pointer) * aspectScale;
    float ptrDist = length(ptrDelta);
    vec2 ptrDir = ptrDist > 0.0001 ? ptrDelta / ptrDist : vec2(0.0);

    if (u_lensStrength > 0.001) {
      float lensRadius = 0.16;
      if (ptrDist < lensRadius * 1.6) {
        float normD = ptrDist / lensRadius;
        float dome = exp(-normD * normD * 1.85) * u_lensStrength;
        totalOffset -= ptrDelta * dome * 0.34;
        float rim = exp(-pow(normD - 0.82, 2.0) * 14.0) * u_lensStrength;
        totalSpecular += rim * 0.18;
        totalChroma += dome * 0.0038;
      }
    }

    // Gentle desktop cursor wake (no click needed)
    if (u_hoverStrength > 0.001) {
      float hoverRadius = 0.14;
      float hFactor = exp(-(ptrDist * ptrDist) / (2.0 * hoverRadius * hoverRadius)) * u_hoverStrength;
      float hRipple = sin(ptrDist * 32.0 - u_time * 4.5) * hFactor;
      totalOffset += ptrDir * hRipple * 0.0065;
      totalSpecular += max(0.0, hFactor) * 0.035;
    }

    vec2 baseUV = getCoverUV(v_uv + totalOffset, u_resolution, u_mediaResolution);
    vec2 uvR = clamp(baseUV + totalOffset * (0.18 + totalChroma * 18.0), 0.002, 0.998);
    vec2 uvG = clamp(baseUV, 0.002, 0.998);
    vec2 uvB = clamp(baseUV - totalOffset * (0.18 + totalChroma * 18.0), 0.002, 0.998);

    float rCol = texture2D(u_texture, uvR).r;
    float gCol = texture2D(u_texture, uvG).g;
    float bCol = texture2D(u_texture, uvB).b;

    vec3 finalColor = vec3(rCol, gCol, bCol) + vec3(totalSpecular * 0.95, totalSpecular * 0.9, totalSpecular * 0.78);
    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface LiquidGlassHeroVideoProps {
  mp4Url?: string;
  webmUrl?: string;
  posterUrl?: string;
  containerRef: React.RefObject<HTMLElement | null>;
}

export const LiquidGlassHeroVideo: React.FC<LiquidGlassHeroVideoProps> = ({
  mp4Url = HERO_VIDEO_CONFIG.mp4Url,
  webmUrl = HERO_VIDEO_CONFIG.webmUrl,
  posterUrl = HERO_VIDEO_CONFIG.posterUrl,
  containerRef,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useStaticPosterOnly, setUseStaticPosterOnly] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Ripple ring buffer (up to 5 overlapping ripples)
  const ripplesRef = useRef<RippleSlot[]>([
    { x: 0.5, y: 0.5, startTime: -10, active: false },
    { x: 0.5, y: 0.5, startTime: -10, active: false },
    { x: 0.5, y: 0.5, startTime: -10, active: false },
    { x: 0.5, y: 0.5, startTime: -10, active: false },
    { x: 0.5, y: 0.5, startTime: -10, active: false },
  ]);
  const nextRippleIdxRef = useRef(0);

  // Spring-smoothed pointer & lens state
  const pointerTargetRef = useRef({ x: 0.5, y: 0.5 });
  const pointerCurrentRef = useRef({ x: 0.5, y: 0.5 });
  const isPointerDownRef = useRef(false);
  const lensStrengthRef = useRef(0);
  const hoverStrengthRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const isHeroVisibleRef = useRef(true);

  // Detect mobile / Save-Data / Reduced-Motion
  useEffect(() => {
    const navConn = (navigator as unknown as { connection?: { saveData?: boolean } })
      .connection;
    const isSaveData = Boolean(navConn?.saveData);
    const isSmallMobile = window.matchMedia('(max-width: 1023px)').matches;
    if (prefersReducedMotion || isSaveData || isSmallMobile) {
      setUseStaticPosterOnly(true);
    } else {
      setUseStaticPosterOnly(false);
    }
  }, [prefersReducedMotion]);

  // IntersectionObserver: Play video & WebGL ONLY when hero is >= 20% visible
  useEffect(() => {
    const heroEl = containerRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        isHeroVisibleRef.current = visible;

        const vid = videoRef.current;
        if (vid && !useStaticPosterOnly) {
          if (visible && !document.hidden) {
            vid.play().catch(() => {
              // Autoplay blocked or still buffering; poster texture stays active
            });
          } else {
            vid.pause();
          }
        }
      },
      { threshold: [0, 0.2, 0.5] }
    );

    observer.observe(heroEl);

    const handleVisibilityChange = () => {
      const vid = videoRef.current;
      if (!vid) return;
      if (document.hidden) {
        vid.pause();
      } else if (isHeroVisibleRef.current && !useStaticPosterOnly) {
        vid.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [containerRef, useStaticPosterOnly]);

  // Attach pointer listeners to the Hero container so clicking anywhere triggers liquid glass relative to the canvas
  useEffect(() => {
    const heroEl = containerRef.current;
    if (!heroEl || useStaticPosterOnly) return;

    const getNormalizedCoords = (clientX: number, clientY: number) => {
      const targetEl = canvasRef.current || heroEl;
      const rect = targetEl.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / Math.max(rect.width, 1)));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / Math.max(rect.height, 1)));
      return { x, y };
    };

    const spawnRipple = (x: number, y: number) => {
      const idx = nextRippleIdxRef.current;
      ripplesRef.current[idx] = {
        x,
        y,
        startTime: performance.now() * 0.001,
        active: true,
      };
      nextRippleIdxRef.current = (idx + 1) % 5;
    };

    const onPointerDown = (e: PointerEvent) => {
      const coords = getNormalizedCoords(e.clientX, e.clientY);
      pointerTargetRef.current = coords;
      pointerCurrentRef.current = coords;
      isPointerDownRef.current = true;
      spawnRipple(coords.x, coords.y);
    };

    const onPointerMove = (e: PointerEvent) => {
      const coords = getNormalizedCoords(e.clientX, e.clientY);
      pointerTargetRef.current = coords;
      lastMoveTimeRef.current = performance.now() * 0.001;
    };

    const onPointerUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        spawnRipple(pointerCurrentRef.current.x, pointerCurrentRef.current.y);
      }
    };

    heroEl.addEventListener('pointerdown', onPointerDown, { passive: true });
    heroEl.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    return () => {
      heroEl.removeEventListener('pointerdown', onPointerDown);
      heroEl.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [containerRef, useStaticPosterOnly]);

  // WebGL Shader Setup & 60fps Capped Render Loop
  useEffect(() => {
    if (useStaticPosterOnly) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Create texture initialized with poster image so first paint is immediate
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 1x1 warm charcoal fallback pixel until poster loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([11, 11, 11, 255])
    );

    let posterLoaded = false;
    let mediaWidth = 1920;
    let mediaHeight = 1080;

    const posterImg = new Image();
    posterImg.crossOrigin = 'anonymous';
    posterImg.src = posterUrl;
    posterImg.onload = () => {
      posterLoaded = true;
      mediaWidth = posterImg.naturalWidth || 1920;
      mediaHeight = posterImg.naturalHeight || 1080;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posterImg);
    };

    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMediaResLoc = gl.getUniformLocation(program, 'u_mediaResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uPointerLoc = gl.getUniformLocation(program, 'u_pointer');
    const uLensLoc = gl.getUniformLocation(program, 'u_lensStrength');
    const uHoverLoc = gl.getUniformLocation(program, 'u_hoverStrength');
    const uRipplesLoc = gl.getUniformLocation(program, 'u_ripples[0]');

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    let lastFrameTime = 0;

    const render = (nowMs: number) => {
      rafId = requestAnimationFrame(render);

      if (!isHeroVisibleRef.current || document.hidden) return;

      if (nowMs - lastFrameTime < 15) return;
      lastFrameTime = nowMs;

      handleResize();

      const nowSec = nowMs * 0.001;
      const vid = videoRef.current;

      // Keep the primary studio photograph as the hero visual unless the user explicitly loads a custom video
      const isDefaultPlaceholderVideo = mp4Url === HERO_VIDEO_CONFIG.mp4Url;
      if (
        !isDefaultPlaceholderVideo &&
        vid &&
        vid.readyState >= vid.HAVE_CURRENT_DATA &&
        !vid.paused
      ) {
        mediaWidth = vid.videoWidth || mediaWidth;
        mediaHeight = vid.videoHeight || mediaHeight;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, vid);
        } catch {
          // Cross-origin fallback keeps poster texture
        }
      } else if (posterLoaded) {
        // The studio photograph remains active in the WebGL Liquid Glass shader
      }

      pointerCurrentRef.current.x +=
        (pointerTargetRef.current.x - pointerCurrentRef.current.x) * 0.14;
      pointerCurrentRef.current.y +=
        (pointerTargetRef.current.y - pointerCurrentRef.current.y) * 0.14;

      const targetLens = isPointerDownRef.current ? 1.0 : 0.0;
      lensStrengthRef.current += (targetLens - lensStrengthRef.current) * 0.12;

      const timeSinceMove = nowSec - lastMoveTimeRef.current;
      const targetHover = timeSinceMove < 0.35 && !isPointerDownRef.current ? 1.0 : 0.0;
      hoverStrengthRef.current += (targetHover - hoverStrengthRef.current) * 0.08;

      const rippleFloatArray = new Float32Array(20);
      for (let i = 0; i < 5; i++) {
        const slot = ripplesRef.current[i];
        const age = nowSec - slot.startTime;
        const isActive = slot.active && age >= 0 && age < 1.5 ? 1.0 : 0.0;
        if (isActive < 0.5) slot.active = false;
        rippleFloatArray[i * 4 + 0] = slot.x;
        rippleFloatArray[i * 4 + 1] = slot.y;
        rippleFloatArray[i * 4 + 2] = age;
        rippleFloatArray[i * 4 + 3] = isActive;
      }

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uMediaResLoc, mediaWidth, mediaHeight);
      gl.uniform1f(uTimeLoc, nowSec);
      gl.uniform2f(
        uPointerLoc,
        pointerCurrentRef.current.x,
        pointerCurrentRef.current.y
      );
      gl.uniform1f(uLensLoc, lensStrengthRef.current);
      gl.uniform1f(uHoverLoc, hoverStrengthRef.current);
      gl.uniform4fv(uRipplesLoc, rippleFloatArray);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [posterUrl, mp4Url, useStaticPosterOnly]);

  // Static / Mobile / Reduced-Motion Mode with natural illumination on the subject
  if (useStaticPosterOnly) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0B0B0B]" aria-hidden="true">
        <img
          src={posterUrl}
          alt=""
          className="h-full w-full object-cover object-[54%_18%]"
        />
        {/* Subtle left/bottom edge blend into #0B0B0B without darkening the woman's face */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[linear-gradient(180deg,rgba(11,11,11,0.35)_0%,rgba(11,11,11,0.0)_28%,rgba(11,11,11,0.0)_75%,rgba(11,11,11,0.65)_100%)]
          "
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0B0B0B]" aria-hidden="true">
      {/* Hidden Source Video Element */}
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        poster={posterUrl}
        className={
          webglSupported
            ? 'pointer-events-none absolute h-px w-px opacity-0'
            : 'h-full w-full object-cover object-[58%_20%]'
        }
      >
        <source src={webmUrl} type="video/webm" />
        <source src={mp4Url} type="video/mp4" />
      </video>

      {/* Right-Side WebGL Liquid Glass Canvas (Naturally Illuminated Subject) */}
      {webglSupported && (
        <canvas
          ref={canvasRef}
          className="h-full w-full block"
        />
      )}

      {/* Left-edge feather gradient so the right-side photograph blends seamlessly into the dark left text column, leaving the subject's face 100% naturally illuminated */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,0.88)_14%,rgba(11,11,11,0.38)_28%,rgba(11,11,11,0.0)_44%)]
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(11,11,11,0.18)_0%,rgba(11,11,11,0.0)_22%,rgba(11,11,11,0.0)_80%,rgba(11,11,11,0.45)_100%)]
        "
      />
    </div>
  );
};
