import * as THREE from 'three'


export default function StudioMap () {

    let mapMesh, playerLabel, bellLabel
    this.camera = null
    this.scene = null
    this.renderer = null

    let frustumSize = 300;

    const resize = () => {
        if (this.camera) {
            const size = this.renderer.domElement.parentNode.getBoundingClientRect();
            const aspect = size.width/size.height;

            if (size.width > 545) {
               frustumSize = 300
            } else {
                frustumSize = 850 - size.width 
            }


            this.camera.left = - frustumSize * aspect / 2
            this.camera.right = frustumSize * aspect / 2
            this.camera.top = frustumSize / 2
            this.camera.bottom = - frustumSize / 2
            this.camera.updateProjectionMatrix()
        }
    }

    this.init = () => {
        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 5, 1000)
        this.camera.position.set(-105, 150, 35)
        this.camera.lookAt(new THREE.Vector3(-105, 0, 35))

        let lightA = new THREE.AmbientLight( 0xffffff, 1.9 )
        lightA.position.set( 5, 5, 5 )
        this.scene.add( lightA )

        playerLabel = new THREE.Mesh(
            new THREE.SphereGeometry(3, 15, 15),
            new THREE.MeshBasicMaterial({ color: 0xffff00 })
        )
        this.scene.add(playerLabel)

        bellLabel = new THREE.Mesh(
            new THREE.SphereGeometry(2, 15, 15),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        )
        this.scene.add(bellLabel) 

        const background = new THREE.Mesh(
            new THREE.PlaneGeometry(5000, 5000),
            new THREE.MeshBasicMaterial({ color: 0x31291b })
        )
        background.rotation.x = - Math.PI / 2
        background.position.y = - 20
        this.scene.add(background)

        window.addEventListener('resize', resize)
    }

    this.setGarden = mesh => {
        mapMesh = mesh
        this.scene.add(mapMesh)
    }

    this.setBellPosition = pos => {
        bellLabel.position.set(pos.x, pos.y, pos.z)
    }

    this.setRenderer = r => {
        this.renderer = r
        resize()
    }

    this.updatePlayer = mesh => {
        playerLabel.position.copy(mesh.position)
    }  

    this.drawFrame = () => {
        this.renderer.render(this.scene, this.camera)
    }
} 