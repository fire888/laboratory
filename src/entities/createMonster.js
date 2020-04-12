import * as THREE from 'three'
import { componentWalk } from '../components/componentWalk'

export function createMonster (monsterModel, monsterMat) {
    const group = new THREE.Group()

    const obj = monsterModel.scene.children[1]
    obj.position.set(0, -8, 0)
    const m = obj.children[1] 

    const objRay = new THREE.Object3D()
    objRay.position.set(0, 0, 1)
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

    let state = 'walk' // || 'stay' 
    let isUpdate = false

    const walk = componentWalk(group) 

    return ({ 
        mesh: group,
        isUpdate,
        update (data) {
            if (state === 'walk') { 
                walk.update()
            }
            mixer.update(data.delta)
        },
        stay (playerPos) { 
            if (state === 'stay') return;
            state = 'stay'

            const vec3 = new THREE.Vector3()
            vec3.copy(playerPos)
            vec3.y = group.position.y
            group.lookAt(vec3)

            walkAction.stop()
            actionAction.play()
            mixer.timeScale = 0.3 
        },
        walk () { 
            if (state === 'walk') return; 
            state = 'walk'
            actionAction.stop()
            walkAction.play()
            mixer.timeScale = 0.7
        },
        startUpdate () {
            if (this.isUpdate) return;
            this.isUpdate = true
            walkAction.play()
            mixer.timeScale = 0.7 
        },
        stopUpdate () {
            if (!this.isUpdate) return;
            this.isUpdate = false
            walkAction.stop()
            actionAction.play()
            actionAction.stop()
        },
    })
}
