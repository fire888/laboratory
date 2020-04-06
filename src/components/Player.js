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

  let collisionFloor
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
    console.log('doorsObjectLink',doorsObjectLink)

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

    vec3Src.copy(mainObj.position)
    const raycaster = new THREE.Raycaster(vec3Src, vec3Ray)
    const intersects = raycaster.intersectObject(collisionFloor[0]) 
    if ( !intersects || intersects.length === 0 || intersects[0].distance > offsetFromFloor + offsetFromFloorFactor) {
      mainObj.position.y += speedDown
      return;
    }    
    mainObj.position.y = intersects[0].point.y + offsetFromFloor

    if (keys['up']) {
          frontObj.getWorldPosition(vec3Ray2)
          vec3Src2.copy(mainObj.position)
          
          vec3Ray2.sub(vec3Src2)

          const raycaster01 = new THREE.Raycaster(vec3Src2, vec3Ray2)
          const intersects01 = raycaster01.intersectObjects(collisionFloor)

          if (intersects01 && intersects01[0]) {
            if (intersects01[0].distance < offsetWallCollision) {
              const doorId = checkDoor(intersects01[0].object)
              if (doorId) {
                console.log('!!!!')
                doorsObject[doorId]['mesh'].position.y += 20 
                doorsObject[doorId]['ray'].position.y += 20 
                //intersects01[0].object.position.y += 20
                collisionFloor = collisionFloor.filter(item => item['userData']['id'] !== doorId)
                collisionFloor.push(doorsObject[doorId]['ray'])
                //emitter.emit('openDoor', doorId)
              }
              return;
            }
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
    setFloorToCollision: arr => collisionFloor = arr,
  }
}


const checkDoor = mesh => mesh['userData']['type'] && (mesh['userData']['type'] === 'door') && mesh['userData']['id']