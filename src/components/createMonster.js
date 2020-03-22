import * as THREE from 'three'

export function createMonster (monsterModel, monsterMat, eventEmitter, mode) {
    const group = new THREE.Group()

    const obj = monsterModel.scene.children[1]
    const m = obj.children[1] 

    m.material = monsterMat 
    group.add(obj)
    let animations, mixer

    animations = monsterModel.animations
    mixer = new THREE.AnimationMixer(m)
    mixer.timeScale = mode === 0 ? 0.2 : 1 
    const walkAction = mixer.clipAction(animations[ 2 ])
    const actionAction = mixer.clipAction(animations[ 0 ])
    actionAction.play()

    

    eventEmitter.subscribe('frameUpdate')(data => mixer.update(data.delta)) 

    let isCanChange = true
    const startPlay = isPaused => {
        if (isCanChange === false) {
            return
        }
        isCanChange = false
        isPaused ? actionAction.paused = true : actionAction.paused = false
        setTimeout(() => isCanChange = true, 1000)
    }

    return ({ 
        mesh: group,
        actions: {
            walkAction,
            actionAction,
        },
        startPlay,
    })
}
