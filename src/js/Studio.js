

import * as THREE from 'three'
import * as HELPERS from './helpers'

export default function Studio (emitterLink) {

  const emitter = emitterLink
  /*emitter.subscribe('keyEvent', function (keys) {
    if (isOn && keys['m'] === true) {
        isOn = false
        scene.fog = null
        return;
    }
    if (!isOn && keys['m'] === true) {
        isOn = true
        scene.fog = new THREE.FogExp2( 0x8fcfec, 0.017);
        return
    }
  })*/

  emitter.subscribe('krugerDead', () => {
    isPlayerView = true
  })

  let camera, cameraScene, scene, renderer,
  assets = null,
  areas = {
    'roads': [],
    'checkpoints': [],
    'gamePoints': []
  },
  gardenMesh = null,
  bellsPositions = [],
  cameraOldData = {
    pos: new THREE.Vector3(),
    rot: new THREE.Vector3(),
  }

  const resize = () => {
    const size = renderer.domElement.parentNode.getBoundingClientRect();
    renderer.setSize( size.width, size.height )
    if (camera) {
      camera.aspect = size.width/size.height
      camera.updateProjectionMatrix()
    }
    if (cameraScene) {
      cameraScene.aspect = size.width/size.height
      cameraScene.updateProjectionMatrix()
    }
  }

  let isPlayerView = true 

  return {
    initScene: function () {
      renderer = new THREE.WebGLRenderer( {
        canvas: document.getElementById( 'webgl-canvas' ),
        antialias: true
      } )
      renderer.setClearColor( 0x8fcfec )
      renderer.setPixelRatio( window.devicePixelRatio )
      renderer.setSize( window.innerWidth, window.innerHeight )
      scene = new THREE.Scene()
      scene.background = 0x8fcfec
      scene.fog = new THREE.FogExp2( 0x8fcfec, 0.017);
      let lightA = new THREE.AmbientLight( 0xffffff, 0.9 )
      lightA.position.set( 5, 5, 5 )
      scene.add( lightA )
      let pLight1 = new THREE.PointLight( 0x615d19, 1 )
      pLight1.position.set( 0, -10, 1000 )
      scene.add( pLight1 )
      const pLight2 = new THREE.PointLight( 0x615d19, 1 )
      pLight2.position.set( 0, -10, -1000 )
      scene.add( pLight2 )
      cameraScene = new THREE.PerspectiveCamera( 70, 1, 0.1, 1000 )
      window.addEventListener('resize', resize)

      resize()
    },

    setCamera: function (cam) {
      camera = cam
    },

    drawFrame: function () {
      if (!camera ) {
        return
      }
    
      if (isPlayerView) {
        renderer.render( scene, camera )
      }
      if (!isPlayerView) {
        renderer.render( scene, cameraScene )     
      }  
    },

    renderKrugerDeath (mesh) {
      cameraScene.position.copy(cameraOldData.pos)
      cameraScene.rotation.copy(cameraOldData.rot)
      cameraScene.position.set(-3, 6, 0)
      cameraScene.lookAt(new THREE.Vector3())
      mesh.add(cameraScene)
      isPlayerView = false
    },

    getAreas () {
      return areas
    },

    getGarden () {
      return gardenMesh
    },

    getPositionsBells () {
      return bellsPositions
    },

    getRenderer() {
      return renderer
    },

    createLevelFromAssets: function (data) {

      assets = data

      assets['wall-green-map'].wrapS = assets['wall-green-map'].wrapT = THREE.RepeatWrapping
      assets['wall-green-normal'].wrapS = assets['wall-green-normal'].wrapT = THREE.RepeatWrapping
      assets['grass-green-map'].wrapS = assets['grass-green-map'].wrapT = THREE.RepeatWrapping
      assets['gravii-map'].wrapS = assets['gravii-map'].wrapT = THREE.RepeatWrapping
    
    
      const matGreenWall = new THREE.MeshPhongMaterial({ 
        color: 0x9ce386,
        map: assets['wall-green-map'],
        normalMap: assets['wall-green-normal'],
        normalScale: new THREE.Vector2( 1, 1 ),
        shininess: 100,
      })
      const matGreenGlass = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        map: assets['grass-green-map'],
        bumpMap: assets['grass-green-map'],
        bumpScale: 10,
        shininess: 100,
      })
      const matGravii = new THREE.MeshPhongMaterial({ 
        color: 0x779977,
        map: assets['gravii-map'],
        bumpMap: assets['gravii-map'],
        shininess: 100,
      })
      const matBench = new THREE.MeshPhongMaterial({ 
        color: 0xa69e79,
        shininess: 100,
      })
      const matWood = new THREE.MeshPhongMaterial({
        map: assets['wood-map'],
        color: 0x544f2b,
        shininess: 100,
      })
      const matMap = new THREE.MeshPhongMaterial({ 
        map: assets['map-map'],
        shininess: 100,
      })
      const matIron = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        shininess: 100, 
        side: THREE.DoubleSide,   
      })
      const matIronRed = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        shininess: 100, 
        side: THREE.DoubleSide,   
      })

      gardenMesh = new THREE.Group()
    
      assets['park'].traverse((child) => {
        if ( child.type === 'LineSegments') {
          if (child.name === 'road') {
            areas['roads'].push(HELPERS.prepearPoligon(child))
          }
          if (child.name === 'checkpoint') {
            areas['checkpoints'].push(HELPERS.prepearPoligon(child))
          }
          if (child.name === 'call_one') {
            areas['gamePoints'].push(HELPERS.prepearPoligon(child))
          }
          if (child.name === 'call_two') {
            areas['gamePoints'].push(HELPERS.prepearPoligon(child))
          }
          if (child.name === 'exit') {
            areas['gamePoints'].push(HELPERS.prepearPoligon(child))
          }          
        }
    
        if ( child instanceof THREE.Mesh != true ) {
          return;
        }
    
        let gardenItemCopy
        let mesh
    
        if ( child.name === 'green' ) {
          mesh = new THREE.Mesh( child.geometry, matGreenWall )
          gardenItemCopy = mesh.clone()
          gardenMesh.add(gardenItemCopy)
        }
        if ( child.name === 'grass' ) {
          mesh = new THREE.Mesh( child.geometry, matGreenGlass )
        }
        if ( child.name === 'gravii' ) {
          mesh = new THREE.Mesh( child.geometry, matGravii )
        }
        if ( child.name === 'bench' ) {
          mesh = new THREE.Mesh( child.geometry, matBench )
        }
        if ( child.name === 'wood' ) {
          mesh = new THREE.Mesh( child.geometry, matWood )
        } 
        if ( child.name === 'map' ) {
          mesh = new THREE.Mesh( child.geometry, matMap )
        }
        if ( child.name === 'iron' ) {
          mesh = new THREE.Mesh( child.geometry, matIron )
        } 
        if ( child.name === 'iron_red' ) {
          mesh = new THREE.Mesh( child.geometry, matIronRed )
          child.geometry.computeBoundingSphere()
          bellsPositions.push(child.geometry.boundingSphere.center)
        } 
        scene.add( mesh )
      })
    },

    addToScene: function (mesh) {
      scene.add( mesh )
    }
  }
}






