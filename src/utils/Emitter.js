
import * as _ from 'lodash' 

export default function EventEmitter () { 
    const storage = {}
    return { 
        emit: id => data => getOrCreateArrFromObj(storage)(id)
            .forEach(action => action(data)),
        subscribe: id => callback => getOrCreateArrFromObj(storage)(id)
            .push(callback)
    }
}

const getOrCreateArrFromObj = obj => key => obj[key] = obj[key] ? obj[key] : []





/*


export default function EventEmitter () { 

    const storage = {}

    return { 
        emit: id => data => getOrCreateArrFromObj(storage)(id)
            .forEach(action => action(data)),
        subscribe: id => callback => getOrCreateArrFromObjA(storage)(id)
            .push(callback)
    }
}

const getOrCreateArrFromObj = obj => key => obj[key] = obj[key] ? obj[key] : []


*/









