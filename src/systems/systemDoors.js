/**
 * Created by Vasilii on 08.04.2020.
 */

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
            addToScene(objDoors[key]['mesh'])
            arrDoors.push(objDoors[key]['mesh'])
        }
        setDoorsToCollision(arrDoors)
    })

    emitter.subscribe('collisionDoors')(doorId => animateTopBottom(objDoors[doorId]['mesh']))
}