export function createLevelFromAssets (assets) {

    const levelItems = [], collisionItems = [] 
    const doors = {}

    const materials = createMaterials(assets)   

    assets['level'].traverse(child => {
      child.name.includes("room_")
        && levelItems.push(new THREE.Mesh(child.geometry, materials.wall))
      
      if (child.name.includes("doormesh_")) {
        const key = child.name.split('_')[1]
        !doors[key] && (doors[key] = {})
        doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.easyMat)
      }

      if (child.name.includes("doorray_")) {
        const key = child.name.split('_')[1]
        !doors[key] && (doors[key] = {})
        doors[key]['ray'] = new THREE.Mesh(child.geometry, materials.easyMat)
        console.log(doors[key]['ray'])
        doors[key]['ray']['userData']['type'] = 'door'
        doors[key]['ray']['userData']['id'] = key
      }
    })


    assets['levelCollisions'].traverse(child => 
      child.name === "wall_collision" 
        && collisionItems.push(new THREE.Mesh(child.geometry, materials.easyMat)))

    for (let key in doors) {
      collisionItems.push(doors[key]['ray'])
    }


    return ({
      levelItems,
      doors,
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