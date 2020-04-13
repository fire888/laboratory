

let kvadrant = [null, null, null]
let playerMesh


export function createEventSwitchCvadrant (player, emitter) {
    playerMesh = player
    kvadrant = getKvadrant(playerMesh) 

    return () => {
        if (!compareKvadrant(playerMesh)) {
            kvadrant = getKvadrant(playerMesh, 'player')
            emitter.emit('updatePlayerCvadrant')()
        }
    }
}


const getKvadrant = (mesh) => [
    Math.floor(mesh.position.x / 30),
    Math.floor(mesh.position.y / 10),
    Math.floor(mesh.position.z / 30)
]



const compareKvadrant = mesh => {
    const kv = getKvadrant(mesh)
    return kvadrant[0] === kv[0] && kvadrant[1] === kv[1] && kvadrant[2] === kv[2]
}

export const compareNearKvadrant = mesh => {
    const kv = getKvadrant(mesh)
    for (let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j ++) {
            if (kvadrant[0] + i === kv[0] && kvadrant[1] === kv[1] && kvadrant[2] + j === kv[2]) {
                return true
            }
        }
    }
    return false
}


export const checkNearPlayer = mesh => {
    return mesh.position.distanceTo(playerMesh.position) < 15 ? playerMesh.position : false
}


