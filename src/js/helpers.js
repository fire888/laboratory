import * as THREE from 'three'


/**
 * Check is point in poiligon
 * 
 * @param {object} coord {x: float, z: float}
 * @param {object} poligon {arrX: Array, arrY: Array}
 * @returns {boolean} 
 */
const isInPoly = function (coord, poligon) {
    var j = poligon.arrX.length - 1
    var c = 0
    var yp = poligon.arrY
    var xp = poligon.arrX
    for (let i = 0; i < poligon.arrX.length; i++) {
        if ((((yp[i]<=coord.z) && (coord.z<yp[j])) || ((yp[j]<=coord.z) && (coord.z<yp[i]))) && 
           (coord.x > (xp[j] - xp[i]) * (coord.z-yp[i])/(yp[j] - yp[i]) + xp[i])) {
               c = !c                          
        }
        j = i
    }
    return c;
}


/**
 * Prepear data poligon
 * 
 * @param {object} obj instance THREE.LineSegments
 * @returns {object} {type: string, arrX: Array, arrY: Array}
 */
const prepearPoligon = function (obj) {
    let area = {
        id: obj.name + '-' + Math.floor(Math.random()*10000),
        type: obj.name,
        arrX: [],
        arrY: [],
        position: new THREE.Vector3(0, -13, 0),
    }

    let verticies = obj.geometry.attributes.position.array
    for ( let i = 0; i < verticies.length - 3 ; i += 3  ) {
        area.arrX.push( verticies[ i ] )
        area.arrY.push( verticies[ i + 2 ] )
    }
    area.position.x = getMiddleOfArr(area.arrX)
    area.position.z = getMiddleOfArr(area.arrY)
    return area
}

const getMiddleOfArr = function ( arr ) {
    let val = 0
    for (let i = 0; i < arr.length; i++) {
        val += arr[i]  
    }
    return val / arr.length
} 


/**
 * 
 * @param {object} coord1 {x: float, y: float} 
 * @param {object} coord2 {x: float, y: float} 
 */
const nearCoord = function (coord1, coord2) {
    if ( Math.abs(coord1.x - coord2.x) < 1.5 
        && Math.abs(coord1.z - coord2.z) < 1.5 ) {
        return true
    }
    return false
}

export {
    isInPoly,
    prepearPoligon,
    nearCoord
}