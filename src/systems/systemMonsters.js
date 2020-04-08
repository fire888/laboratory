/**
 * Created by Vasilii on 08.04.2020.
 */

import { unitsConfig } from '../constants/elementsConfig'
import { cloneGltf } from '../utils/glTFcopy'
import { createMonster } from '../entities/createMonster'

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

    emitter.subscribe('frameUpdate')(() =>
        arrMonsters.forEach(item =>
            Math.random() < 0.5 ? item.startPlay(true) :  item.startPlay(false))
    )
}
