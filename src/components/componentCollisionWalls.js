/**
 * Created by Vasilii on 08.04.2020.
 */

import * as THREE from 'three'

export const createComponentCollisionWalls = (objFromLink, objToLink, offset) => {
    const offsetWallCollision = offset
    const objFrom = objFromLink
    const objTo = objToLink

    const vec3Src2 = new THREE.Vector3()
    const vec3Ray2 = new THREE.Vector3()

    return {
        check: () => {
            objTo.getWorldPosition(vec3Ray2)
            vec3Src2.copy(objFrom.position)

            vec3Ray2.sub(vec3Src2)

            const raycasterWalls = new THREE.Raycaster(vec3Src2, vec3Ray2)
            const intersectsWalls = raycasterWalls.intersectObjects(WALLS_ARRAY)

            if (intersectsWalls[0] && intersectsWalls[0].distance < offsetWallCollision) {
                return true;
            }

            return false;
        }
    }

}

export const setWallsToCollision = arr => WALLS_ARRAY = arr

let WALLS_ARRAY

