import * as THREE from 'three'
import 'three/examples/js/loaders/OBJLoader'
import 'three/examples/js/loaders/GLTFLoader'

import '../assets/start-img.png'
import '../assets/progress-img.png'
import '../assets/icon-map.png'

import levelSrc from '../assets/park.obj'
import greenWallSrc from '../assets/green-map.png'
import greenWallNormalSrc from '../assets/green-normal.png'
import greenGlassSrc from '../assets/glass-map.png'
import graviiSrc from '../assets/gravii-map.png'
import mapSrc from '../assets/map.png'
import woodSrc from '../assets/wood-map.png'

import krugerSrc from '../assets/kruger.glb'
import krugerMapSrc from '../assets/kruger-map.jpg'
import krugerNormalSrc from '../assets/kruger-normal-map.png'
import krugerShadowSrc from '../assets/kruger-shadow.png'



export default function LoadManager (eventEmitter) {

    const assetsToLoad = [
        {
            type: 'obj',
            filename: levelSrc,
            key: 'park'
        },
        {
            type: 'glb',
            filename: krugerSrc,
            key: 'man'
        },      
        {
            type: 'img',
            filename: greenWallSrc,
            key: 'wall-green-map'
        },
        {
            type: 'img',
            filename: greenWallNormalSrc,
            key: 'wall-green-normal'
        },
        {
            type: 'img',
            filename: greenGlassSrc,
            key: 'grass-green-map'
        },
        {
            type: 'img',
            filename: graviiSrc,
            key: 'gravii-map'
        },
        {
            type: 'img',
            filename: graviiSrc,
            key: 'gravii-map'
        },
        {
            type: 'img',
            filename: mapSrc,
            key: 'map-map'
        },
        {
            type: 'img',
            filename: woodSrc,
            key: 'wood-map'
        },
        {
            type: 'img',
            filename: krugerMapSrc,
            key: 'kruger-map'
        },
        {
            type: 'img',
            filename: krugerNormalSrc,
            key: 'kruger-normal-map'
        },
        {
            type: 'img',
            filename: krugerShadowSrc,
            key: 'kruger-drop-shadow-map'
        },
    ]

    const assets = {}

    const emitter = eventEmitter

    let objLoader, textureLoader, gltfLoader

    let index = 0;


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
        index ++;
        if ( index < assetsToLoad.length ) {
            loadAsset(assetsToLoad[index])
        } else {
            emitter.emit('loadingComplete', assets);
        }
    }


    this.startLoad = function () {
        objLoader = new THREE.OBJLoader();
        textureLoader = new THREE.TextureLoader();
        gltfLoader = new THREE.GLTFLoader();
        loadAsset(assetsToLoad[index]);
    } 
}