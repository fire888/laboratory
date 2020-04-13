/**
 * Created by Vasilii on 08.04.2020.
 */


import * as THREE from 'three'

export const createComponentCollisionFloors = (objFromLink, offset, delta, speed) => {
    const objFrom = objFromLink
    const offsetFromFloor = offset
    const offsetFromFloorFactor = delta
    const speedDown = speed

    const vec3Src = new THREE.Vector3()
    const vec3Ray = new THREE.Vector3(0, -1, 0)

    return {
        check: () => {
            vec3Src.copy(objFrom.position)
            const raycasterDown = new THREE.Raycaster(vec3Src, vec3Ray)
            const intersectsFloor = raycasterDown.intersectObject(FLOORS_ARRAY[0])
            if ( intersectsFloor && intersectsFloor[0] && intersectsFloor[0].distance > offsetFromFloor + offsetFromFloorFactor) {
                objFrom.position.y += speedDown
                return;
            }
            objFrom.position.y = intersectsFloor[0].point.y + offsetFromFloor
        }
    }

}

export const setFloorsToCollision = arr => FLOORS_ARRAY = arr
export const setEmitterToCollisionFloors = emitter => EMITTER = emitter

let FLOORS_ARRAY
let EMITTER

