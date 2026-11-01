/**
 * The 3D Bivek that sits on the K (lazy-loaded; see Character3D.tsx).
 *
 * A Minecraft player model (skinview3d's PlayerObject) wearing /overworld/skin.png (painted by
 * design/build/paint_skin.py; any standard 64x64 Minecraft skin works), plus extra hair voxels, a backpack with a
 * tripod, and eyelids for blinking. He sits with his legs hanging over the edge: the head follows the cursor, the body
 * turns a little, the legs swing, he blinks, looks around when the mouse is still, and waves when clicked.
 */
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, Group, InstancedMesh, Mesh, MeshStandardMaterial, NearestFilter,
  Object3D, PerspectiveCamera, SRGBColorSpace, Scene, TextureLoader, WebGLRenderer,
} from 'three';
import { PlayerObject } from 'skinview3d/libs/model.js';

export interface CharacterHandle {
  look(nx: number, ny: number): void;   // cursor relative to the character, roughly -1..1
  wave(): void;
  setRunning(on: boolean): void;
  resize(): void;
  dispose(): void;
}

import { VIEW_CENTER_Y, VIEW_HEIGHT } from './character3d-view';

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Fluffy hair: little cubes over the top, sides and back of the head, with an orange rim on the right. */
function hair(): InstancedMesh {
  const r = rng(7);
  const spots: [number, number, number, string][] = [];
  const dark = ['#26181a', '#2e1d18', '#3a2620', '#221514'];
  const pick = () => dark[Math.floor(r() * dark.length)];
  // crown: a bumpy cap
  for (let x = -5; x <= 5; x++) {
    for (let z = -5; z <= 4; z++) {
      const edge = Math.abs(x) === 5 || z === -5 || z === 4;
      if (edge && r() < 0.35) continue;
      const h = (edge ? 0 : 1) + Math.round(r() * 1.6 + (z < 0 ? 0.8 : 0.2));
      for (let k = 0; k < h; k++) {
        spots.push([x * 0.95, (edge ? 7.6 : 8.6) + k * 0.95, z * 0.95, x >= 3 && r() < 0.4 && k === h - 1 ? '#d66e34' : pick()]);
      }
    }
  }
  // a few spikes sticking up / out, like the render
  for (const [x, y, z] of [[1, 11.6, 0], [2.4, 11.2, -1.5], [-1.5, 11.3, -0.5], [4.2, 10.4, 1], [-4.4, 10, 0.5], [0, 10.8, -3.5]] as const) {
    spots.push([x, y, z, x > 2 ? '#d66e34' : pick()]);
  }
  // sides and back tufts
  for (let y = 3; y <= 8; y++) {
    for (let z = -4; z <= 3; z++) {
      if (y < 5 && z > 0) continue;
      if (r() < 0.75) spots.push([-4.75, y, z, pick()]);
      if (r() < 0.75) spots.push([4.75, y, z, r() < 0.3 ? '#d66e34' : pick()]);
    }
    for (let x = -4; x <= 4; x++) if (r() < 0.85) spots.push([x, y - 1, -4.75, pick()]);
  }
  // messy fringe over the forehead
  for (const [x, y] of [[-3.5, 7.4], [-2.2, 7.8], [-1, 7.3], [0.4, 7.9], [1.6, 7.4], [3, 7.7], [-3.8, 6.6], [3.8, 6.4]] as const) {
    spots.push([x, y, 4.55, pick()]);
  }
  const mesh = new InstancedMesh(new BoxGeometry(1.25, 1.25, 1.25), new MeshStandardMaterial({ roughness: 0.9 }), spots.length);
  const o = new Object3D();
  spots.forEach(([x, y, z, c], i) => {
    o.position.set(x, y, z);
    o.rotation.set((r() - 0.5) * 0.3, (r() - 0.5) * 0.3, (r() - 0.5) * 0.3);
    o.updateMatrix();
    mesh.setMatrixAt(i, o.matrix);
    mesh.setColorAt(i, new Color(c));
  });
  return mesh;
}

function box(w: number, h: number, d: number, color: string, x: number, y: number, z: number) {
  const m = new Mesh(new BoxGeometry(w, h, d), new MeshStandardMaterial({ color, roughness: 0.85 }));
  m.position.set(x, y, z);
  return m;
}

export function createCharacter(canvas: HTMLCanvasElement, onReady: () => void): CharacterHandle {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const camera = new PerspectiveCamera(22, 1, 1, 400);
  const dist = VIEW_HEIGHT / 2 / Math.tan((22 / 2) * (Math.PI / 180));
  const tilt = 0.22; // a little from above, so the tops of the legs show
  camera.position.set(0, VIEW_CENTER_Y + Math.sin(tilt) * dist, Math.cos(tilt) * dist);
  camera.lookAt(0, VIEW_CENTER_Y, 0);

  // light like the scene: warm sun from the top right, sky fill, orange rim from behind on the right
  scene.add(new AmbientLight(0xdfe8ff, 0.75));
  const sun = new DirectionalLight(0xfff0d8, 1.9);
  sun.position.set(30, 50, 45);
  scene.add(sun);
  const rim = new DirectionalLight(0xff8a3a, 2.6);
  rim.position.set(45, 18, -40);
  scene.add(rim);

  const player = new PlayerObject();
  const sk = player.skin;
  scene.add(player);

  // pose: sitting on the edge, legs hanging forward, hands by the hips
  const LEG = -1.05;
  sk.rightLeg.rotation.x = LEG;
  sk.leftLeg.rotation.x = LEG;
  const ARM = -0.62;
  sk.rightArm.rotation.set(ARM, 0, 0.1);
  sk.leftArm.rotation.set(ARM, 0, -0.1);

  // extras
  sk.head.add(hair());
  const lidMat = new MeshStandardMaterial({ color: '#e9a576', roughness: 0.9 });
  const lids = [-2, 2].map((x) => {
    const g = new BoxGeometry(2.05, 2.05, 0.06);
    g.translate(0, -1.02, 0); // hinge at the top
    const m = new Mesh(g, lidMat);
    m.position.set(x, 5.03, 4.04);
    m.scale.y = 0.001;
    sk.head.add(m);
    return m;
  });
  const pack = new Group();
  pack.add(box(7, 9, 3, '#232022', 0, -5.4, -3.7));
  pack.add(box(7.2, 2.2, 3.2, '#2e292c', 0, -1.4, -3.7));
  pack.add(box(1, 3, 0.4, '#c42824', -2.6, -5.5, -5.3));
  // tripod strapped to the right side of the pack
  pack.add(box(1.3, 12, 1.3, '#3a3638', 4.3, -5, -3.6));
  pack.add(box(1.5, 0.8, 1.5, '#c42824', 4.3, -2.6, -3.6));
  pack.add(box(1.5, 0.8, 1.5, '#c42824', 4.3, -3.8, -3.6));
  pack.add(box(2.2, 1.6, 2.2, '#2a2628', 4.3, 1.4, -3.6));
  sk.body.add(pack);

  // skin texture
  let disposed = false;
  new TextureLoader().load('/overworld/skin.png', (tex) => {
    if (disposed) return;
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.colorSpace = SRGBColorSpace;
    sk.map = tex;
    renderer.render(scene, camera);
    onReady();
  });

  // ---- animation state
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  let lastMove = -1e9;
  let waveStart = -1e9;
  let nextBlink = 2.5;
  let running = false;
  let raf = 0;
  const t0 = performance.now();
  let prev = 0;

  const frame = () => {
    raf = requestAnimationFrame(frame);
    const t = (performance.now() - t0) / 1000;
    const ease = 1 - Math.exp(-Math.min(t - prev, 0.5) * 7); // same follow speed at any frame rate
    prev = t;
    // idle: glance around slowly when the cursor hasn't moved for a while
    const idle = t - lastMove > 3.5;
    const tx = idle ? Math.sin(t * 0.45) * 0.55 : target.x;
    const ty = idle ? Math.sin(t * 0.31) * 0.25 + 0.1 : target.y;
    cur.x += (tx - cur.x) * ease;
    cur.y += (ty - cur.y) * ease;
    sk.head.rotation.y = cur.x * 0.8;
    sk.head.rotation.x = cur.y * 0.32;
    sk.body.rotation.y = cur.x * 0.16;
    // legs swing, gently out of step
    sk.rightLeg.rotation.x = LEG + Math.sin(t * 1.7) * 0.16;
    sk.leftLeg.rotation.x = LEG + Math.sin(t * 1.7 + 2.4) * 0.16;
    // breathing
    sk.body.position.y = -6 + Math.sin(t * 2) * 0.08;
    // blink every few seconds
    const bt = t - nextBlink;
    const lid = bt > 0 && bt < 0.16 ? Math.sin((bt / 0.16) * Math.PI) : 0;
    lids.forEach((l) => (l.scale.y = Math.max(lid, 0.001)));
    if (bt >= 0.16) nextBlink = t + 2.5 + Math.random() * 3;
    // wave
    const w = t - waveStart;
    if (w < 1.3) {
      const up = Math.min(1, w / 0.25) * Math.min(1, (1.3 - w) / 0.25);
      sk.rightArm.rotation.z = 0.1 - up * 2.5 + Math.sin(w * 18) * 0.25 * up;
      sk.rightArm.rotation.x = ARM + up * -ARM;
    } else {
      sk.rightArm.rotation.z = 0.1 + Math.sin(t * 2) * 0.02;
      sk.rightArm.rotation.x = ARM;
    }
    renderer.render(scene, camera);
  };

  const handle: CharacterHandle = {
    look(nx, ny) {
      target.x = Math.max(-1, Math.min(1, nx));
      target.y = Math.max(-1, Math.min(1, ny));
      lastMove = (performance.now() - t0) / 1000;
    },
    wave() {
      waveStart = (performance.now() - t0) / 1000;
    },
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (on) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    },
    resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (!running) renderer.render(scene, camera);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        const m = o as Mesh;
        m.geometry?.dispose();
        const mat = m.material as MeshStandardMaterial | MeshStandardMaterial[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      sk.map?.dispose();
      renderer.dispose();
    },
  };
  handle.resize();
  return handle;
}
