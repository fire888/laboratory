import * as THREE from 'three'

import { playerConfig } from '../constants/elementsConfig'

import { createComponentCollisionDoors } from '../components/componentCollisionDoors'
import { createComponentCollisionFloors } from '../components/componentCollisionFloor'
import { createComponentCollisionWalls } from '../components/componentCollisionWalls'
import { createEventSwitchCvadrant } from '../components/checkerInCvadrant'


export function Player (emitterLink) {
  const emitter = emitterLink

  const { 
    startPos,
    startRot, 
    cameraData, 
    frontObjPos, 
    lightData, 
    speed, 
    offsetFromFloor, 
    offsetFromFloorFactor,
    speedDown, 
    offsetWallCollision,
    speedRot,
  } = playerConfig

  let camera
  let keys = {}
  
  const mainObj = new THREE.Object3D()
  mainObj.position.fromArray(startPos)
  mainObj.rotation.fromArray(startRot)

  const frontObj = new THREE.Object3D()
  frontObj.position.fromArray(frontObjPos)
  mainObj.add(frontObj)
  
  {
      const { fov, ratio, near, far, pos } = cameraData
      camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
      camera.position.fromArray(pos)
      mainObj.add(camera)
  }

  {
      const { color, strenth, pos } = lightData
      const light = new THREE.PointLight(color, strenth)
      light.position.fromArray(pos)
      mainObj.add(light)
  }

  const checkFloors = createComponentCollisionFloors(mainObj, offsetFromFloor, offsetFromFloorFactor, speedDown)
  const checkWalls = createComponentCollisionWalls(mainObj, frontObj, offsetWallCollision)
  const checkDoors = createComponentCollisionDoors(mainObj, frontObj, offsetWallCollision)
  const checkerInCvadrant = createEventSwitchCvadrant(mainObj, emitter)

  const debug = document.getElementById('debugger') 

  const update = () => {
    if (isButtonsDisabled) return;
    checkFloors.check()

    if (keys['up']) {

      if (checkWalls.check() || checkDoors.check()) return;
      mainObj.translateZ( -speed )
      checkerInCvadrant()
    }

    keys['left'] && (mainObj.rotation.y += speedRot)
    keys['right'] && (mainObj.rotation.y -= speedRot)
  }


  emitter.subscribe('keyEvent')(data => keys = data)
  emitter.subscribe('frameUpdate')(update)

  let isButtonsDisabled = false
  emitter.subscribe('messagesIsShow')(val => isButtonsDisabled = val) 


  return {
    getObj: () => mainObj,
    getCamera: () => camera,
  }
}


