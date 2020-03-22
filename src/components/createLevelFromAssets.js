export function createLevelFromAssets (assets) {

    const levelItems = [], collisionItems = [] 

    const materials = createMaterials(assets)   

    assets['level'].traverse(child => 
      child.name.includes("room_")
        && levelItems.push(new THREE.Mesh(child.geometry, materials.wall)))

    assets['levelCollisions'].traverse(child => 
      child.name === "wall_collision" 
        && collisionItems.push(new THREE.Mesh(child.geometry, materials.easyMat)))

    return ({
      levelItems,
      collisionItems,
      materials,
    })
}


const createMaterials = assets => {
  const easyMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

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
    wall,
    monster,
    easyMat,
  })
}