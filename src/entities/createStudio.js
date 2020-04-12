import * as THREE from 'three'
import { studioConfig } from '../constants/elementsConfig'


export function createStudio (emitterLink) {
  const emitter = emitterLink

  let camera, scene, renderer

  const init = () => {
    const { canId, rendererCon, clearColor, backgroundColor, fogData, amb } = studioConfig

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
    const size = {width: window.innerWidth, height: window.innerHeight}//renderer.domElement.parentNode.getBoundingClientRect()
    renderer.setSize(size.width, size.height)
    if (camera) {
        camera.aspect = size.width/size.height
        camera.updateProjectionMatrix()
    }
  }

  init()

  emitter.subscribe('assetsCreated')(levelMeshes => {
    const { levelItems } = levelMeshes
    levelItems.forEach(item => addToScene(item))
  })

  emitter.subscribe('frameUpdate')(() => drawFrame())



  const addToScene = mesh => scene.add( mesh )

  const drawFrame = () => camera && renderer.render( scene, camera )

  return {
    setCamera: cam => camera = cam,
    drawFrame,
    getRenderer: () => renderer,
    addToScene,
  }
}






