import * as HELPERS from './helpers'


export default function () {

    let checkpoints = []
    let playerCheckpoints = []

    return {

        setAreas (arr) {
            checkpoints = arr 
        },

        getVisitedPoints () {
          return playerCheckpoints;
        }, 

        checkIn (coord) {
            for (let i = 0; i < checkpoints.length; i ++) {
                if (HELPERS.isInPoly(coord, checkpoints[i])) {
                    if ( playerCheckpoints.length === 0 ||
                        checkpoints[i]['id'] !== playerCheckpoints[playerCheckpoints.length - 1]['id']) {
                        playerCheckpoints.push(checkpoints[i])
                    }
                    return;
                }
            }
        },

        removePoint () {
            playerCheckpoints.splice(0, 1)         
        },

        clearHistory () {
            playerCheckpoints = []
        }
   }
}