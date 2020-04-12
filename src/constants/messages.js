export const mechanic = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'You is new droid.',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am machanic. I create your body.',
        isDone: false,
    },{
        player: 'MM ...?', 
        nps: 'Go. Door is unblocked.... Beeb.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['factory'],
            }
        }
    }]
}

export const programmer = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'Once .... Beeb.. I set basic program in your memory.',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am programmer.',
        isDone: false,
    },{
        player: 'MMM ...?', 
        nps: 'Go. Once... Beeeb.. Door to laboratory unblocked.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromLaboratory001'],
            }
        }
    }]
}


export const engineer = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'Once .. Beeb! I giv name to you. Droid_Id: 17543-06767-6767',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am engineer. I test new droids.',
        isDone: false,
    },{
        player: 'MMM ...?', 
        nps: 'Go.',
        isDone: false,
    }]
}


export const scientist = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'Droid_Id: 17543-06767-6767, Hmm.., marriage. crap.',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am scientist. I check your abilities. ... garbage.',
        isDone: false,
    },{
        player: 'MMM ...?', 
        nps: 'Go to store. Doors unblocked.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromFactoryCorpus', 'toLab', 'toGarage'],
            }
        }
    }]
}


export const master = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'I don’t know anything, go to the boss. ... Beeb. You have the accesses.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['toBoss'],
            }
        }
    }]
}


export const guard_Super_02 = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'You want see Boss. He is absent.',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am guard. I give you a secret mission.',
        isDone: false,
    },{
        player: 'MMM ...?', 
        nps: 'You must see all around base, and return. Doors unblocked.',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['fromStore', 'fromSecurity', 'toArsenal',],
            }
        }
    }]
}



export const guard_01 = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'Droid_Id: 17543-06767-6767 with secret mission. I know.',
        isDone: false,
    },{
        player: 'You ...?', 
        nps: 'I am gateman. Beeb... Door is opened! Good by!',
        isDone: false,
        event: {
            type: 'unblockDoor',
            data: {
                idDoor: ['toWorld',],
            }
        }
    },]
}


export const scout = {
    isDone: false,
    messages: [{ 
        player: 'I ...?', 
        nps: 'It does not matter.',
        isDone: false,
        event: {
            type: 'blockDoor',
            data: {
                idDoor: ['toWorld',],
            }
        }
    },{
        player: 'You ...?', 
        nps: 'I am scout. Crazy factory create droids and close gates. Yo along in this desert.',
        isDone: false,
    },{
        player: 'MMM ...?', 
        nps: 'This is the end.',
        isDone: false,
    },]
}




