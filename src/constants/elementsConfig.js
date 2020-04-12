const PI = Math.PI
const hPI = PI / 2

export const studioConfig = {
  canId: 'webgl-canvas',
  rendererCon: { 
    antialias: true
  },
  clearColor: 0x0e2535,
  backgroundCoor: 0x222024,
  fogData: { 
    color: 0x0e2535, 
    strength: 0.0117,
  },
  amb: {
    color: 0xffffff, 
    strength: 0.8, 
  },
  "zero": -15,
}

export const playerConfig = {
    speed: 0.35,
    speedRot: 0.02,
    speedDown: -0.25,
    offsetFromFloor: 8.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    startRot: [0, hPI, 0],
    startPos: [48, 28, 10],
    cameraData: {
      fov: 90, 
      ratio: window.innerWidth / window.innerHeight, 
      near: 0.1, 
      far: 1000,
      pos: [0, 0, -0.5],
    },
    frontObjPos: [0, 0, -1],
    lightData: {
      color: 0xffffcc, 
      strength: 0.5,
      pos: [0, 35, 0],
    },
}

export const unitsConfig = [{
    name: 'guard_01',
    pos: [-51, 26.316999435, 27],
    rot: 0,
  },{
    name: 'guard_Super_02',
    pos: [-39, 45.317001, -112],
    rot: 0,
  },{
    name: 'master',
    pos: [-91, 26.316999435, 35],
    rot: hPI - 1,
  },{
    name: 'scientist',
    pos: [31, 64.3152008, -48],
    rot: hPI,
  },{
    name: 'engineer',
    pos: [-1, 25.31520, -69],
    rot: PI,
  },{
    name: 'programmer',
    pos: [25, 64.3152008, -4],
    rot: 0,
  },{
    name: 'mechanic',
    pos: [11, 25.31520, -8],
    rot: hPI,
  },{
    name: 'scout',
    pos: [-49, 26.316999435, 172],
    rot: hPI,
}]


