export function prepareMeshesFromAssets (assets) {

    const levelItems = [], collisionWalls = [], collisionFloors = [], doors = {}

    const materials = createMaterials(assets)   

    assets['level'].traverse(child => {
      child.name.includes("room_")
        && levelItems.push(new THREE.Mesh(child.geometry, materials.wall))
      
      if (child.name.includes("doormesh_")) {
        const key = child.name.split('_')[1]
        !doors[key] && (doors[key] = {})
        doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.door)
        doors[key]['mesh']['userData'] = {
          part: 'mesh',
          type: 'door',
          id: key,
        }
      }
    })


    assets['levelCollisions'].traverse(child => { 
      child.name === "wall_collision" && collisionWalls.push(new THREE.Mesh(child.geometry, materials.easyMat))
      child.name === "floor_collision" && collisionFloors.push(new THREE.Mesh(child.geometry, materials.easyMat))
    })


    return ({
      monsterAnim: assets.monsterAnim,
      levelItems,
      doors,
      collisionWalls,
      collisionFloors,
      materials,
    })
}


const createMaterials = assets => {
  const easyMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  const door = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    map: assets['doorTexture'],
    emissive: 0x191c38,
    bumpMap: assets['doorTexture'],
    bumpScale: 0.2,
    shininess: 100,
  })

  assets['wall-map'].wrapS = assets['wall-map'].wrapT = THREE.RepeatWrapping
  const wall = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    map: assets['wall-map'],
    emissive: 0x191c38,
    bumpMap: assets['wall-map'],
    bumpScale: 0.2,
    shininess: 100,
  })

  const monster = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    map: assets['monster-skin'],
    emissive: 0x191c38,
    bumpMap: assets['monster-skin'],
    bumpScale: 0.2,
    shininess: 500,
    specular: 0xffffff,
    skinning: true,
  })

  return ({
    door,
    wall,
    monster,
    easyMat,
  })
}