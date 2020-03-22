import * as THREE from 'three'
import 'three/examples/js/loaders/OBJLoader'
import 'three/examples/js/loaders/GLTFLoader'

let callback = null
let dataToLoad = null
const assets = {}
let objLoader, textureLoader, gltfLoader
let index = 0


const loadAsset = function (data) {
    if (data.type === 'obj') {
        objLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }
    if (data.type === 'glb' || data.type === 'gltf') {
        gltfLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }        
    if (data.type === 'img') {
        textureLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }
}

const checkComplete = () => {
    index ++
    index < dataToLoad.length 
        ? loadAsset(dataToLoad[index])
        : callback(assets)
}

export const loadAssets = data => {
    return new Promise(resolve => {
        dataToLoad = data
        callback = resolve
        index = 0

        objLoader = objLoader || new THREE.OBJLoader()
        textureLoader = textureLoader || new THREE.TextureLoader()
        gltfLoader = gltfLoader || new THREE.GLTFLoader()
    
        loadAsset(dataToLoad[index])
    })
}