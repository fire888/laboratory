import * as THREE from 'three'
import { componentWalk } from '../components/walk'

export function createMonster (monsterModel, monsterMat) {
    const group = new THREE.Group()

    const obj = monsterModel.scene.children[1]
    const m = obj.children[1] 

    const objRay = new THREE.Object3D()
    objRay.position.set(0, 0.35, 1)
    group.add(objRay)

    m.material = monsterMat 
    group.add(obj)
    let animations, mixer

    animations = monsterModel.animations
    mixer = new THREE.AnimationMixer(m)
    const walkAction = mixer.clipAction(animations[ 2 ])
    const actionAction = mixer.clipAction(animations[ 0 ])
    mixer.timeScale = 0.7 
    walkAction.play()

    const walk = componentWalk(group)
    
    const update = (data) => {
        walk.update()
        mixer.update(data.delta)
    }

    return ({ 
        mesh: group,
        actions: {
            walkAction,
            actionAction,
        },
        update,
    })
}
