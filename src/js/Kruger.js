import * as THREE from 'three'
import * as HELPERS from './helpers'
import * as HELPERS_GEOM from './helpersGeom'
import { CONFIG } from './config'

function Kruger ( eventEmitter ) {
    const emitter = eventEmitter
    let group = new THREE.Group()
    let mesh = null
    let shadow = null
    let clips = null
    let checkpoints = null 

    let animations, mixer, actions
    let explosiveGeomData

    let currentTarget = null
    let vec3 = new THREE.Vector3()

    this.state = 'none'  // || 'hunt' || 'huntInArea' || 'boom' || 'afterBoom'

    const update = data => {
        if (this.state === 'none') return;
        if (this.state === 'hunt') huntAction(data);
        if (this.state === 'huntInArea') huntAreaAction(data);
        if (this.state === 'boom') updateBoom(data);
    }


    const huntAction = data => {
        if (checkpoints.getVisitedPoints().length > 0 && !currentTarget) { 
            this.setTarget(checkpoints.getVisitedPoints()[0]) 
        }

        if (currentTarget) {
            group.lookAt(currentTarget.position)
            group.translateZ(+0.053)
            mixer.update(data.delta) 
            if (HELPERS.nearCoord(currentTarget.position, group.position)) {
                if (currentTarget.type === 'checkpoint') {
                    checkpoints.removePoint()
                    this.setTarget(null)
                }
            }   
        }
    }



    const huntAreaAction = data => {
        if (currentTarget) {
            currentTarget.getWorldPosition(vec3)

            group.lookAt(vec3)
            group.translateZ(+0.033)

            mixer.update(data.delta)
        }
    }



    const updateBoom = () => {
        let isAnimateDeath = HELPERS_GEOM.geomAnimateExplosive(explosiveGeomData)
        if (isAnimateDeath) {
            shadow.scale.x += 0.005
            shadow.scale.y += 0.005
        }
        if (!isAnimateDeath) {
            this.state = 'afterBoom'
            emitter.emit('krugerDead', null)
        }
    }



    this.setModel = (data) => {
        if (!Kruger.modelData) {
            Kruger.modelData = data['man']
            Kruger.map = data['kruger-map']
            Kruger.normalMap = data['kruger-map']
            Kruger.shadow = data['kruger-drop-shadow-map']
        }

        mesh = Kruger.modelData.scene.children[0]
        mesh.children[1].material = new THREE.MeshPhongMaterial({ 
            map: Kruger.map, 
            normalMap: Kruger.normalMap,
            normalScale: new THREE.Vector2( 1.0, 1.0 ),
            skinning: true,
        }) 

        shadow = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 3),
            new THREE.MeshPhongMaterial({
                map: Kruger.shadow,
                transparent: true,
                opacity: 0.5,
            }) 
        )
        shadow.rotation.x = -Math.PI/2
        shadow.position.y = -1.95
        group.add(shadow) 

        group.add(mesh)
        group.position.fromArray(CONFIG['kruger']['startPosition'])   
        animations = Kruger.modelData.animations;
        mixer = new THREE.AnimationMixer( mesh )
        const walkAction = mixer.clipAction( animations[ 0 ] )
        walkAction.play()
        actions = [ walkAction ]    
    }

    this.getModel = () => {
        return group;
    }

    this.getSkeleton = () => {
        const skeleton = new THREE.SkeletonHelper( mesh );
        skeleton.visible = true;
        return skeleton;
    }

    this.setCheckpoints = ( checkpointsInstance )  => {
        checkpoints = checkpointsInstance
    }

    this.startUpdate = () => {
        emitter.subscribe('frameUpdate', update)
    }

    this.setTarget = (target) => {
        currentTarget = target
        if (currentTarget)
            group.lookAt(currentTarget.position)
    }

    this.setState = (val) => {
        this.state = val
    }

    this.prepearDeath = () => {
        group.rotation.x = 0
        group.rotation.z = 0
        explosiveGeomData = HELPERS_GEOM.prepearGeometryToAnimate(mesh.children[1].geometry)
        mesh.children[1].geometry = explosiveGeomData.geom
        this.state = 'boom'
    }
}

Kruger.modelData = null
Kruger.map = null
Kruger.normalMap = null

export { Kruger } 