import * as THREE from 'three'

export default function Player () {
  
  let mainObj
  const vec3Src = new THREE.Vector3()
  const vec3Ray = new THREE.Vector3(0, -1, 0)
  let frontObj
  const vec3Src2 = new THREE.Vector3()
  const vec3Ray2 = new THREE.Vector3()
  const vec3Ray3 = new THREE.Vector3()

  let collisionFloor
  let camera
  let keys = null
  let isOn = true
  
  let speed = null
  let speedRot = null
  let offsetFromFloor = null 
  let speedDown = null

  let offsetWallCollision = null


  const init = (playerConfig, emitter) => {
    const { 
      startPosition, 
      cameraData, 
      frontObjPos, 
      lightData, 
      speedVal, 
      offsetFromFloorVal, 
      speedDownVal, 
      offsetWallCollisionVal, 
      speedRotVal
    } = playerConfig

    speed = speedVal
    speedRot = speedRotVal
    speedDown = speedDownVal
    offsetFromFloor = offsetFromFloorVal
    offsetWallCollision = offsetWallCollisionVal

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
    if ( !intersects || intersects.length === 0 || intersects[0].distance > offsetFromFloor) {
      mainObj.position.y += speedDown
      return;
    }    
    mainObj.position.y = intersects[0].point.y + offsetFromFloor

    if (keys['up']) {



          frontObj.getWorldPosition(vec3Ray2)
          vec3Src2.copy(mainObj.position)
          
          vec3Ray2.sub(vec3Src2)

          const raycaster01 = new THREE.Raycaster(vec3Src2, vec3Ray2)
          const intersects01 = raycaster01.intersectObject(collisionFloor[0])

          //console.log(intersects01)

          if (intersects01 && intersects01[0]) {
            if (intersects01[0].distance < offsetWallCollision) {
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