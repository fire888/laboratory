import { createComponentCollisionWalls } from './componentCollisionWalls'
import { createComponentCollisionDoors } from './componentCollisionDoors'

export function componentWalk (obj) {
    const mesh = obj

    const collisionWalls = createComponentCollisionWalls(mesh, mesh.children[0], 12)
    const collisionDoors = createComponentCollisionDoors(mesh, mesh.children[0], 12)

    let isRotate = false
    let angleRot = 0
    let numRotations = 40
    let countRotation = 0

    return {
        update: () => {
            if (isRotate) {
                mesh.rotation.y += angleRot / numRotations
                countRotation ++
                countRotation > numRotations && (isRotate = false)
                return
            }

            mesh.translateZ(0.11)
            
            if (collisionWalls.check() || collisionDoors.check()) {
                isRotate = true
                angleRot = (Math.random() * Math.PI + 1) * Math.random() < 0.5 ? 1 : -1
                countRotation = 0
            }
        }
    }
} 