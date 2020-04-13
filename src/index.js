
import { showStartButton } from './systemsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets } from './helpers/prepareMeshesFromAssets'
import { FrameUpdater } from './utils/FrameUpater'

import { createSystemDoors } from './systems/systemDoors'
import { createSystemMonsters } from './systems/systemMonsters'
import { createSystemDialog } from './systemsHtml/sustemDialog'
import { createStudio } from './entities/createStudio'
import { Player } from './entities/Player'

import { setFloorsToCollision, setEmitterToCollisionFloors } from './components/componentCollisionFloor'
import { setWallsToCollision } from './components/componentCollisionWalls'

import { assetsToLoad } from './constants/assetsToLoad' 
import { createInfo } from './systemsHtml/info'


const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)

  createSystemDoors(emitter, studio.addToScene)
  createSystemMonsters(emitter, studio.addToScene)
  createSystemDialog(emitter)
  createInfo() 

  loadAssets(assetsToLoad)
    .then(assets => {

      const levelMeshes = prepareMeshesFromAssets(assets)
      emitter.emit('assetsCreated')(levelMeshes)

      const { collisionWalls, collisionFloors } = levelMeshes
      setWallsToCollision(collisionWalls)
      setFloorsToCollision(collisionFloors)
      setEmitterToCollisionFloors(emitter)

      new FrameUpdater(emitter)
      new KeyBoard(emitter)
      
      const player = Player(emitter)
      studio.setCamera(player.getCamera())
      studio.addToScene(player.getObj())
  
      showStartButton()
    })
}


window.addEventListener('load', initApp)

