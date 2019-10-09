import * as THREE from 'three'
import * as HELPERS from './helpers'


export default function Collisions (eventEmitter) {
    

    let isOn = false
    const emitter = eventEmitter
    /*emitter.subscribe('keyEvent', function (keys) {
        if (isOn && keys['w'] === true) {
            isOn = false
            return;
        }
        if (!isOn && keys['w'] === true) {
            isOn = true
            return
        }
    })*/
    emitter.subscribe('loadingComplete', function () {
        isOn = true
    })


    const coord = new THREE.Vector3()
    let poligons = []

    return {

        setAreas (arr) {
            poligons = arr            
        },

        check ( mesh ) {
            if (!isOn) {
                return true;
            }

            mesh.getWorldPosition( coord )

            for (let iP = 0; iP < poligons.length; iP ++) {
               if ( HELPERS.isInPoly( coord, poligons[iP] ) ) {
                   return poligons[iP]['id'];
               }
            }

            return false;
        }
    }
}