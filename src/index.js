
import { showStartButton } from './componentsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { cloneGltf } from './utils/glTFcopy'
import { loadAssets } from './utils/loadAssets'
import { FrameUpdater } from './utils/FrameUpater'

import { createStudio } from './components/createStudio'
import { Player } from './components/Player'
import { createLevelFromAssets } from './components/createLevelFromAssets'
import { createMonster } from './components/createMonster'

import { unitsConfig, studioConfig, playerConfig } from './constants/elementsConfig'
import { assetsToLoad } from './constants/assetsToLoad' 


let state = 'none' // 'start' // || 'hunt' || 'done' || 'afterDone'
let emitter,
studio,
player


const initApp = () => {
  emitter = Emitter()
  new FrameUpdater(emitter)
  new KeyBoard(emitter)

  studio = createStudio()
  studio.initScene(studioConfig)

  player = Player(playerConfig)
  player.init(emitter)
  studio.setCamera(player.getCamera())
  studio.addToScene(player.getObj())

  const arrMonsters = []

  loadAssets(assetsToLoad)
    .then(assets => {
      const { levelItems, collisionItems, materials } = createLevelFromAssets(assets)

      levelItems.forEach(item => studio.addToScene(item))  
      
      player.setFloorToCollision(collisionItems) 
      
      unitsConfig.forEach(item => {
        const unit = createMonster(cloneGltf(assets.monsterAnim), materials.monster, emitter, 0) 
        unit.mesh.position.set(item.pos[0], item.pos[1], item.pos[2])
        unit.mesh.rotation.y = item.rot
        studio.addToScene(unit.mesh)
        arrMonsters.push(unit)
      })
      
      state = 'start'
  
      emitter.subscribe('frameUpdate')(() => {
        arrMonsters.forEach(item =>
          Math.random() < 0.5 ? item.startPlay(true) :  item.startPlay(false))
        studio.drawFrame()
      })
  
      showStartButton()
    })
}


window.addEventListener('load', initApp)


