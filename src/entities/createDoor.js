

export function createDoor (doorData) {
    const { mesh } = doorData
    mesh.userData.unblocked = true
    return mesh
}

