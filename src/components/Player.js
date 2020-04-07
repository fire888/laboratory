import * as THREE from 'three'

let doorsObject

export function Player (playerConfig) {
  let emitter

  let mainObj
  const vec3Src = new THREE.Vector3()
  const vec3Ray = new THREE.Vector3(0, -1, 0)
  let frontObj
  const vec3Src2 = new THREE.Vector3()
  const vec3Ray2 = new THREE.Vector3()

  let collisionFloors
  let collisionWalls
  let camera
  let keys = null
  let isOn = true

  

  const { 
    startPosition, 
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



  const init = (emitterLink, doorsObjectLink) => {
    emitter = emitterLink
    doorsObject = doorsObjectLink

    mainObj = new THREE.Object3D()
    mainObj.position.fromArray(startPosition)
    
    {
      const { fov, ratio, near, far, pos } = cameraData
      camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
      camera.position.fromArray(pos)
      mainObj.add(camera)
    }

    frontObj = new THREE.Object3D()
    frontObj.position.fromArray(frontObjPos)
    mainObj.add(frontObj)

    {
      const { color, strenth, pos } = lightData
      const light = new THREE.PointLight(color, strenth)
      light.position.fromArray(pos)
      mainObj.add(light)
    }

    emitter.subscribe('keyEvent')(data => keys = data)
    emitter.subscribe('frameUpdate')(update)
  }


  const update = () => {
    if ( !keys || !isOn ) {
      return;
    }

    // floor
    vec3Src.copy(mainObj.position)
    const raycasterDown = new THREE.Raycaster(vec3Src, vec3Ray)
    const intersectsFloor = raycasterDown.intersectObject(collisionFloors[0]) 
    if ( intersectsFloor && intersectsFloor[0] && intersectsFloor[0].distance > offsetFromFloor + offsetFromFloorFactor) {
      mainObj.position.y += speedDown
      return;
    }    
    mainObj.position.y = intersectsFloor[0].point.y + offsetFromFloor


    // wall
    if (keys['up']) {
      frontObj.getWorldPosition(vec3Ray2)
      vec3Src2.copy(mainObj.position)
          
      vec3Ray2.sub(vec3Src2)

      const raycasterWalls = new THREE.Raycaster(vec3Src2, vec3Ray2)
      const intersectsWalls = raycasterWalls.intersectObjects(collisionWalls)

      if (intersectsWalls[0] && intersectsWalls[0].distance < 10) {
        const doorId = checkDoor(intersectsWalls[0].object)
        if (doorId) {
          setTimeout(() => { 
            doorsObject[doorId]['mesh'].position.y = 0
          },  2000)

          doorsObject[doorId]['mesh'].position.y += 20
          return; 
        }
      }
          
      if (intersectsWalls[0] && intersectsWalls[0].distance < offsetWallCollision) {
        return;
      }
      mainObj.translateZ( -speed )
    }  

    keys['left'] && (mainObj.rotation.y += speedRot)
    keys['right'] && (mainObj.rotation.y -= speedRot)
  }

  return { 
    init,
    getObj: () => mainObj,
    getCamera: () => camera,
    getMesh: () => mesh,
    setFloorToCollision: (arrFloors, arrWalls) => { 
      collisionFloors = arrFloors
      collisionWalls = arrWalls
    },
  }
}


const checkDoor = mesh => mesh['userData']['type'] && (mesh['userData']['type'] === 'door') && mesh['userData']['id']