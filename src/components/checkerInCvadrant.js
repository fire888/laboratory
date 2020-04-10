import { playerConfig } from '../constants/elementsConfig'


let oldKvadrant = [null, null, null]


export function createEventSwitchCvadrant (playerMesh, emitter) {
    oldKvadrant = getKvadrant(playerMesh, 'player') 

    return () => {
        if (!compareKvadrant(playerMesh)) {
            oldKvadrant = getKvadrant(playerMesh, 'player')
            emitter.emit('updatePlayerCvadrant')()
        }
    }
}


const getKvadrant = (mesh, player) => [
    Math.floor(mesh.position.x / 50),
    Math.floor((mesh.position.y - player ? playerConfig.offsetFromFloor : 0) / 20),
    Math.floor(mesh.position.z / 50)
]



export const compareKvadrant = mesh => {
    const kv = getKvadrant(mesh)
    return oldKvadrant[0] === kv[0] && oldKvadrant[1] === kv[1] && oldKvadrant[2] === kv[2]
}
