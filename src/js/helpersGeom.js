import * as THREE from 'three'

const prepearGeometryToAnimate = ob => {

    let gObject = {
      constY: [],
      constZ: [],
      constX: [],
      spdBoom: [],
      geom: ob
    }
  
    let geometry = new THREE.Geometry().fromBufferGeometry( gObject.geom )
  
    for ( let vi = 0; vi < geometry.vertices.length; vi ++ ) {
  
      gObject.constY.push( geometry.vertices[ vi ].y )
      gObject.constZ.push( geometry.vertices[ vi ].z )
      gObject.constX.push( geometry.vertices[ vi ].x )
  
      gObject.spdBoom.push( {
        x: (Math.random() - 0.5) * 0.01,
        y: -0.001,  
        z: (Math.random() - 0.5) * 0.01
      })
    }
  
    gObject.geom = geometry 
  
    return gObject
}


let isAnimate = true 
const geomAnimateExplosive = b => {
    if (!isAnimate) {
        return
    }

    let { spdBoom, geom, constX, constY, constZ } = b
  
    isAnimate = false
    let verts = 0
    for ( let i = 0; i < geom.vertices.length; i ++ ) {
        if ( geom.vertices[ i ].y > -1.85 ) {
            verts ++
            geom.vertices[ i ].y -= Math.random() * 0.02;
        } else {
            geom.vertices[ i ].x = constX[ i ] += spdBoom[ i ].x 
            geom.vertices[ i ].z = constZ[ i ] += spdBoom[ i ].z
        }
    }
  
    geom.verticesNeedUpdate = true
    if (verts > 50) {
        isAnimate = true
    }
    return isAnimate
}


export {
    prepearGeometryToAnimate,
    geomAnimateExplosive,
}

