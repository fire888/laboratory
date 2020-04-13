

export function createInfo (eventEmitter) {
    const infoWrapper = document.getElementById('info')
    let wrapperOpened = false
    const buttInfo = document.getElementById('butt-info')
    buttInfo.onclick = () => {
        wrapperOpened = !wrapperOpened
        infoWrapper.style.display = wrapperOpened ? 'flex' : 'none'
    }
    const closeInfo = document.getElementById("close-info")
    closeInfo.onclick = () => {
        wrapperOpened = false
        infoWrapper.style.display = 'none'
    }
} 