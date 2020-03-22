import '../assets/start-img.png'
import '../assets/progress-img.png'
import '../assets/icon-map.png'

import levelSrc from '../assets/level.obj'
import levelRaySrc from '../assets/level-ray.obj'
import wallSrc from '../assets/wall.jpg'

import monsterMap from '../assets/monster-skin.jpg'
import monsterAnimSrc from '../assets/monster-animate3.glb'


export const assetsToLoad = [
    {
        type: 'obj',
        filename: levelSrc,
        key: 'level'
    },
    {
        type: 'obj',
        filename: levelRaySrc,
        key: 'levelCollisions'
    },
    {
        type: 'glb',
        filename: monsterAnimSrc,
        key: 'monsterAnim'
    }, 
    {
       type: 'glb',
        filename: monsterAnimSrc,
        key: 'monsterAnim2'
    }, 
    {
        type: 'img',
        filename: wallSrc,
        key: 'wall-map'
    },
    {
        type: 'img',
        filename: monsterMap,
        key: 'monster-skin'
    },
]