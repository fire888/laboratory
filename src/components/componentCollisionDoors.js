/**
 * Created by Vasilii on 08.04.2020.
 */

import * as THREE from 'three'

export const createComponentCollisionDoors = (objFromLink, objToLink, offsetWall) => {
    const vec3Src2 = new THREE.Vector3()
    const vec3Ray2 = new THREE.Vector3()

    const objFrom = objFromLink
    const objTo = objToLink
    const offsetWallCollision = offsetWall

    return {
        check: () => {
            vec3Src2.copy(objFrom.position)
            objTo.getWorldPosition(vec3Ray2)

            vec3Ray2.sub(vec3Src2)

            const raycasterDoors = new THREE.Raycaster(vec3Src2, vec3Ray2)
            const intersectsDoors = raycasterDoors.intersectObjects(DOORS_ARRAY)

            if (intersectsDoors[0] && intersectsDoors[0].distance < 10) {
                const doorId = checkDoor(intersectsDoors[0].object)
                doorId && EMITTER.emit('collisionDoors')(doorId)
            }

            if (intersectsDoors[0] && intersectsDoors[0].distance < offsetWallCollision) {
                return true;
            }

            return false;
        }
    }

}

const checkDoor = mesh => mesh['userData']['type'] && (mesh['userData']['type'] === 'door') && mesh['userData']['id']

export const setDoorsToCollision = arr => DOORS_ARRAY = arr
export const setEmitterDoorsToCollision = emitter => EMITTER = emitter

let DOORS_ARRAY
let EMITTER

