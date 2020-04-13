/**
 * Created by Vasilii on 08.04.2020.
 */
import { createDoor } from '../entities/createDoor'
import { setDoorsToCollision, setEmitterDoorsToCollision } from '../components/componentCollisionDoors'
import { animateTopBottom } from '../components/animateTopBottom'

export const createSystemDoors = (eventEmitter, addToSceneLink) => {
    const emitter = eventEmitter
    const addToScene = addToSceneLink

    setEmitterDoorsToCollision(emitter)

    let objDoors = null
    emitter.subscribe('assetsCreated')(assets => {
        objDoors = assets.doors
        const arrDoors = []
        for (let key in objDoors) {
            const door = createDoor(objDoors[key])
            addToScene(door)
            arrDoors.push(door)
        }
        setDoorsToCollision(arrDoors)
    })

    emitter.subscribe('collisionDoors')(doorId => { 
        objDoors[doorId]['mesh']['userData']['unblocked'] && animateTopBottom(objDoors[doorId]['mesh'])
    })

    emitter.subscribe('unblockDoor')(data => { 
        data.idDoor.forEach(element => {
            objDoors[element]['mesh']['userData']['unblocked'] = true
        });
    })

    emitter.subscribe('blockDoor')(data => { 
        data.idDoor.forEach(element => {
            objDoors[element]['mesh']['userData']['unblocked'] = false
        });
    })
}