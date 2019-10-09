/********************************************************************
 * TODO:
 * 
 * refactoring .......................... 16h
 * 
 * 
 * BUGS:
 * 
 * hold kruger in 3-th rotation ......... 0.5h
 * 
 * ???????????????????????????????
 * 
 * hotel ................................ 3h
 * snow ................................. 2h
 * instructions ......................... 2h
 * 
 * *****************************************************************
 * 
 * DONE:
 * 
 * DOP: +0.5h(map labels) +0.8h(camera kruger death)
 * 
 * V info button .......................... 2h (9:44 - 10:54) +1h
 * - deathKruger .......................... 2h (8:35 - 10:00  18:35 - 20-17) -1h (ошибка расчета)
 * V deathPlayer .......................... 2h (21:00 - 22:15) 
 * - mapTop ............................... 2h (14:08 - 15:52) (19:40 - 20:58) -1h 50m (ошибка расчета)
 * - design buttons ....................... 0.5h (8:08 - 08:46 9:10-10:07) -1h (ошибка расчета)
 * V angle move kruger to target .......... 2h (7:54-8:08)
 * V startScreen .......................... 4h ( 11:58 - 13:40 14:00 - 15:33 21:15 - 22:59)
 * V loader ............................... 2h
 * V start add kruger ..................... 10m
 * V resizeCanvas ......................... 0.5h 11:16-11:33 (0.25h) 
 * V shadow under Kruger .................. 1h  10:43-11:16 (0.5h)
 * 
 */
 
import Studio from './js/Studio'
import StudioMap from './js/StudioMap'
import KeyBoard from './js/keyBoard'
import Emitter from './js/Emitter'
import LoadManager from './js/LoadManager'
import Player from './js/Player'
import Collisions from './js/Collisions'
import { Kruger } from './js/Kruger'
import FrameUpater from './js/FrameUpater'
import Checkpoints from './js/Checkpoints'


let emitter,
studio, studioMap,
loadManager, collisions, checkpoints, playerCustomAreas,
player, kruger,
state = 'none' // 'start' // || 'hunt' || 'done' || 'afterDone'


/** INIT  ***********************************************************/

const initApp = () => {

  emitter = new Emitter()
  new FrameUpater( emitter )
  new KeyBoard( emitter )

  studio = Studio(emitter)
  studio.initScene()

  studioMap = new StudioMap(emitter)
  studioMap.init()

  collisions = Collisions( emitter )
  playerCustomAreas = Collisions( emitter )
  checkpoints = Checkpoints( emitter )

  player = Player( emitter )
  player.init()
  player.setCollisions( collisions )
  player.setCheckpoints( checkpoints )

  studio.setCamera( player.getCamera() )

  loadManager = new LoadManager( emitter )

  emitter.subscribe('loadingComplete', assets => {
    studio.createLevelFromAssets(assets)
    studioMap.setGarden(studio.getGarden())
    studioMap.setRenderer(studio.getRenderer())
    studioMap.setBellPosition(studio.getPositionsBells()[0])

    collisions.setAreas(studio.getAreas()['roads'])
    checkpoints.setAreas(studio.getAreas()['checkpoints'])
    playerCustomAreas.setAreas(studio.getAreas()['gamePoints'])

    kruger = new Kruger(emitter)
    kruger.setModel(assets)
    kruger.setCheckpoints( checkpoints )
    kruger.startUpdate()

    state = 'start'
    showStartButton()
  })

  loadManager.startLoad()

  emitter.subscribe('frameUpdate', function () {
    updateAppState()
    if (!isShowMap) { 
      studio.drawFrame()
    } else {
      studioMap.updatePlayer(player.getCamera())
      studioMap.drawFrame()
    }
  })
}


/** UPDATE *********************************************************/

let playerInGamePoint = null

const updateAppState = () => {

  // CHECK PLAYER NEAR BELL
  if (state !== 'none' || state !== 'done') {
    let area = playerCustomAreas.check( player.getCamera() )
    if (area && typeof area === 'string') {
      if (area.match(/call_one/g) && !playerInGamePoint) {
        playerInGamePoint = 'call_one'
        tougleButtonBell('show')
      }
      if (area.match(/call_two/g) && !playerInGamePoint) {
        playerInGamePoint = 'call_two'
        tougleButtonBell('show')
      }
    }
    if (!area && playerInGamePoint) {
      playerInGamePoint = false
      tougleButtonBell('hide')
    }
  }

  // CHECK PLAYER NEAR EXIT
  if (state === 'done') {
    let area = playerCustomAreas.check( player.getCamera() )
    if (area && typeof area === 'string') {
      if (area.match(/exit/g) && !playerInGamePoint) {
        playerInGamePoint = 'exit' 
        state = 'afterDone'       
        showEndMessage(messages.win)
      }
    }
  }
  

  // ATTACK PLAYER IN AREA
  if (state === 'hunt') {
    const playerRoad = collisions.check(player.getCamera())
    let krugerRoad = collisions.check(kruger.getModel())
    if (playerRoad === krugerRoad && kruger.state !== 'huntInArea') {
      kruger.setState('huntInArea')
      kruger.setTarget(player.getMesh())
      checkpoints.clearHistory()
    }
    if (playerRoad !== krugerRoad && kruger.state === 'huntInArea') {
      kruger.setState('hunt')
      kruger.setTarget(null)
    }
    if (!isClear) {
      setLight() 
    }
  }

  // DAMAGE PLAYER DISTANCE
  if (state === 'hunt' && kruger.state === 'huntInArea') {
    let dist = kruger.getModel().position.distanceTo(player.getCamera().position)
    if (dist > 15) {
      if (!isClear) {
        setLight()
      }
    } else {
      setDark( 1.0 - (dist / 15) ) 
      if (dist < 1.5) {
        state = 'killed'
        player.disable()
        kruger.setState('none')
        showEndMessage(messages.rip)
        hideButtons()
        setDark( 1.0 ) 
      } 
    }
  }
} 


/** UI *************************************************************/

/** DARK */

let isClear = true 
const darkElem = document.querySelector('.center-container')
const setDark = val => {
  isClear = false
  darkElem.style.background = 'rgba(0,0,0,' + val + ')'
}
const setLight = () => {
  isClear = true
  darkElem.style.background = 'none'
}

/** BUTTON BELL */ 

const buttonBell = document.querySelector('.butt-bang') 

buttonBell.addEventListener('click', () => {
  
  if (buttonBell.classList.contains('down')) {
    return;
  }
  buttonBell.classList.add('down');
  setTimeout(()=> {
    buttonBell.classList.remove('down')
  }, 3000)

  if (playerInGamePoint === 'call_one') {
    if (state !== 'start' ) {
      return
    }
    studioMap.setBellPosition(studio.getPositionsBells()[1])
    state = 'hunt'
    studio.addToScene(kruger.getModel())
    kruger.setState('hunt')
  }
  if (playerInGamePoint === 'call_two') {
    if (state !== 'hunt' ) {
      return
    }
    state = 'done'
    kruger.setState('none')
    kruger.prepearDeath()
    if (checkpoints.getVisitedPoints().length > 3) {
      studio.renderKrugerDeath(kruger.getModel())
    }
    studioMap.setBellPosition({x:10000, y:0, z:0})
  }
})

const tougleButtonBell = val => {
  if (val === 'show') {
    buttonBell.style.display = 'block'
  }
  if (val === 'hide') {
    buttonBell.style.display = 'none'
  }
}

/** ANIMATION LOADER */

const loader = document.querySelector('.progress')
let offsetLoader = -100
let isAnimateLoader = true

const loaderTimeOut = () => {
  if (!isAnimateLoader) {
    return
  }
  setTimeout(() => {
    offsetLoader ++;
    if (offsetLoader == 0 ) {
      offsetLoader = -100
    }
    loader.style.marginLeft = offsetLoader + '%'
    loaderTimeOut() 
  }, 100)
}

loaderTimeOut()

const startButton = document.querySelector('.start')
const progressWrapper = document.querySelector('.load-wrapper')
const showStartButton = () => {
  startButton.style.display = 'inline'
  startButton.addEventListener('click', hideStartScreen)
  progressWrapper.style.display = 'none'
}

const hideStartScreen = () => {
  isAnimateLoader = false
  let startScreen = document.querySelector('.start-screen')
  startScreen.style.display = 'none'
}

/** MAP */

let isShowMap = false
const buttShowMap = document.querySelector('.butt-map')
buttShowMap.addEventListener('click', () => isShowMap = !isShowMap)


/** END MESSAGE */

const endMessage = document.querySelector('.end-message')
const endMessageContent = document.querySelector('.end-message-content')

const showEndMessage = mess => {
  endMessage.style.display = 'flex'
  const closeEndMessage = document.querySelector('.close-end-message')
  endMessageContent.innerHTML = mess
  closeEndMessage.addEventListener('click', () => {
    endMessage.style.display = 'none'
  })
}

const hideButtons = () => {
  const uibutt = document.querySelector('.ui')
  uibutt.style.display = 'none'
}

const messages = {
  win: 'Done !',
  rip: 'R.I.P.',
  info: `<div>Interactive 3D level from film <a href="https://en.wikipedia.org/wiki/The_Shining_(film)" target="_blank">Stenly Cubric "The Shining"</a>.</div>
  <div>Keyboard: &#8592;, &#8593;, &#8594;</div><div class="by">by <a href="http://otrisovano.ru" target="_blank">www.otrisovano.ru</a></div>`,
}

/** INFO MESAAGE */

const infoButton = document.querySelector('.butt-info')
infoButton.addEventListener('click', () => {
  showEndMessage(messages.info) 
})

/** START APP */

window.addEventListener('load', initApp)

