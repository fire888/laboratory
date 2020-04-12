/**
 * Created by Vasilii on 08.04.2020.
 */

import { unitsConfig } from '../constants/elementsConfig'
import { cloneGltf } from '../utils/glTFcopy'
import { createMonster } from '../entities/createMonster'
import { compareNearKvadrant, checkNearPlayer } from '../components/checkerInCvadrant'
 
export const createSystemMonsters = (eventEmitter, addToSceneLink) => {
    const emitter = eventEmitter
    const addToScene = addToSceneLink

    const arrMonsters = []

    emitter.subscribe('assetsCreated')(assets => {
        const material = assets.materials.monster

        unitsConfig.forEach(item => {
            const unit = createMonster(cloneGltf(assets.monsterAnim), material, emitter, 0)
            unit.mesh.position.set(item.pos[0], item.pos[1], item.pos[2])
            unit.mesh.rotation.y = item.rot
            addToScene(unit.mesh)
            arrMonsters.push(unit)
        })
    })

    emitter.subscribe('frameUpdate')(data =>
        arrMonsters.forEach(item => { 
            if (!item.isUpdate) return;
            const near = checkNearPlayer(item.mesh) 
            near ? item.stay(near) : item.walk()
            item.update(data)
        }))

    emitter.subscribe('updatePlayerCvadrant')(() => 
        arrMonsters.forEach(item => { 
            compareNearKvadrant(item.mesh) ? item.startUpdate() : item.stopUpdate()
        }))
}
