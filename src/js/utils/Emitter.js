
export default function () {
 
    var storage = {};


    this.emit = function (id, data) {
        if (!storage[id]) {
            storage[id] = [];
        }
        var sendData = data || null;
        for (var i = 0; i < storage[id].length; i++) {
            storage[id][i](sendData);
        }
    };


    this.subscribe = function (id, callback) {
        if (!storage[id]) {
            storage[id] = [];
        }
        storage[id].push(callback);
    };

};