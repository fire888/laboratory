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
    offsetWallCollision: 2.5,
    level: -13,
    //"startPosition": [-63, 26, 105],
    //"startPosition": [0, 0, 0],
    startPosition: [48, 25, 10],
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
    pos: [-51, 18, 27],
    rot: 0,
  },{
    name: 'guard_02',
    pos: [-32, 18, 29],
    rot: 0,
  },{
    name: 'guard_Super_01',
    pos: [-7, 38, -112],
    rot: 0,
  },{
    name: 'guard_Super_02',
    pos: [-39, 38, -112],
    rot: 0,
  },{
    name: 'master_01',
    pos: [-91, 19, -9],
    rot: hPI - 1,
  },{
    name: 'scientist_01',
    pos: [31, 57, -48],
    rot: hPI,
  },{
    name: 'bio_01',
    pos: [-1, 18, -69],
    rot: PI,
  },{
    name: 'programmer_01',
    pos: [25, 57, -4],
    rot: 0,
  },{
    name: 'factory_01',
    pos: [11, 18, -8],
    rot: hPI,
}]
