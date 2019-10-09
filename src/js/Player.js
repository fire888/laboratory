import * as THREE from 'three'
import { CONFIG } from './config.js'
import { Mesh } from 'three';


export default function Player ( eventEmitter ) {
    
  const emitter = eventEmitter

  let camera, collisionMesh, collisions, checkpoints 
  let keys = null
  let isOn = true
  let currentRoad = null
  let speed = 0.15
  const mesh = new THREE.Object3D()
  mesh.position.set(0, -1, 0) 

  const update = () => {
    if ( !keys || !isOn) {
      return;
    }

    if (keys['up'] === true) {
      if (collisions) {
        currentRoad = collisions.check( collisionMesh ) 
        if (currentRoad) {
          camera.translateZ( -speed )
          checkpoints.checkIn( camera.position )
        }
      }
    }
    if (keys['left'] === true) {
      camera.rotation.y += 0.02
    }
    if (keys['right'] === true) {
      camera.rotation.y -= 0.02
    }
  }

  return { 
    init () {
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 )
      camera.position.fromArray(CONFIG['player']['startPosition'])
      collisionMesh = new THREE.Object3D()
      collisionMesh.position.z = -1
      camera.add( collisionMesh )
      camera.add( mesh )

      emitter.subscribe('keyEvent', data => keys = data)
      emitter.subscribe('frameUpdate', update)
    },

    setCollisions( collisionsInst ) {
      collisions = collisionsInst
    },

    setCheckpoints ( checkpointsInst ) {
      checkpoints = checkpointsInst
    },

    getCamera: function() {
      return camera;
    },

    getMesh () {
      return mesh;
    },

    getRoad () {
      return currentRoad
    },

    disable () {
      isOn = false
    },
  }
}