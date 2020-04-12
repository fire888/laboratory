import * as THREE from 'three'

export function createDoor (doorData) {
    const { mesh } = doorData
    mesh.userData.unblocked = false
    return mesh
}
