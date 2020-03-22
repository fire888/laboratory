////////////////////////////////////////////////////////////


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

const hideStartScreen = () => {
  isAnimateLoader = false
  let startScreen = document.querySelector('.start-screen')
  startScreen.style.display = 'none'
}

export const showStartButton = () => {
  startButton.style.display = 'inline'
  startButton.addEventListener('click', hideStartScreen)
  progressWrapper.style.display = 'none'
}





