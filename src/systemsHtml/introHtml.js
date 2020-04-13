import '../stylesheets/style.css'

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
  }, 30)
}

loaderTimeOut()



const startButton = document.querySelector('.start')
const progressWrapper = document.querySelector('.progress-wrapper')

const hideStartScreen = () => {
  const startScreen = document.querySelector('.start-screen')
  startScreen.style.display = 'none'
}

export const showStartButton = () => {
  isAnimateLoader = false
  startButton.style.display = 'block'
  startButton.addEventListener('click', hideStartScreen)
  progressWrapper.style.display = 'none'
}





