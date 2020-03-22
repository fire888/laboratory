import * as THREE from 'three'


export function createStudio () {

  let camera, scene, renderer

  const init = config => {
    const { canId, rendererCon, clearColor, backgroundColor, fogData, amb } = config

    const canvas = document.getElementById(canId)
    rendererCon.canvas = canvas

    renderer = new THREE.WebGLRenderer(rendererCon)
    renderer.setClearColor(clearColor)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    scene = new THREE.Scene()
    scene.background = backgroundColor

    {
      const { color, strength } = fogData
      scene.fog = new THREE.FogExp2(color, strength)
    }

    {
      const { color, strength } = amb
      let lightA = new THREE.AmbientLight( color, strength )
      scene.add( lightA )
    }

    window.addEventListener('resize', resize)
    resize()
  }

  const resize = () => {
    const size = renderer.domElement.parentNode.getBoundingClientRect()
    renderer.setSize(size.width, size.height)
    if (camera) {
      camera.aspect = size.width/size.height
      camera.updateProjectionMatrix()
    }
  }

  return {
    initScene: init,
    setCamera: cam => camera = cam,
    drawFrame: () => camera && renderer.render( scene, camera ),
    getRenderer: () => renderer,
    addToScene: mesh => scene.add( mesh )
  }
}






