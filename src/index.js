
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



let doorsObject
/*const openDoor = id => {
  console.log('id')
  console.log(doorsObject[id]['ray'].position.y)
  debugger
  doorsObject[id]['mesh'].position.y += 30
  doorsObject[id]['ray'].position.y += 30 
  console.log(doorsObject[id]['ray'].position.y)
}*/

const initApp = () => {
  emitter = Emitter()
  new FrameUpdater(emitter)
  new KeyBoard(emitter)

  studio = createStudio()
  studio.initScene(studioConfig)

  const arrMonsters = []

  loadAssets(assetsToLoad)
    .then(assets => {
      const { levelItems, collisionItems, materials, doors } = createLevelFromAssets(assets)

      /* DOORS */
      doorsObject = doors

      levelItems.forEach(item => studio.addToScene(item)) 
      for (let key in doors) {
        studio.addToScene(doors[key]['mesh'])
      }
            
      unitsConfig.forEach(item => {
        const unit = createMonster(cloneGltf(assets.monsterAnim), materials.monster, emitter, 0) 
        unit.mesh.position.set(item.pos[0], item.pos[1], item.pos[2])
        unit.mesh.rotation.y = item.rot
        studio.addToScene(unit.mesh)
        arrMonsters.push(unit)
      })
      
      state = 'start'
  
      emitter.subscribe('openDoor')(id => {
        console.log('!!!----------------', id)
        //doors[id]['mesh'].position.x += 2 
        //doors[id]['ray'].position.x += 2 
      })

      emitter.subscribe('frameUpdate')(() => {
        arrMonsters.forEach(item =>
          Math.random() < 0.5 ? item.startPlay(true) :  item.startPlay(false))
        studio.drawFrame()
      })

      player = Player(playerConfig)
      player.init(emitter, doorsObject)
      studio.setCamera(player.getCamera())
      studio.addToScene(player.getObj())
      console.log('index doorsObject',doorsObject)
      player.setFloorToCollision(collisionItems) 
  
      showStartButton()
    })
}


window.addEventListener('load', initApp)


