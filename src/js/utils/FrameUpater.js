
export default function (eventEmitter) {

    var emitter = eventEmitter;

    var delta;
    var time;
    var oldTime;
    var count = 0;


    var animate = function () {
        requestAnimationFrame(animate)
      
        time = Date.now();
        delta = (time - oldTime) * 0.001;
        if (isNaN(delta) || delta > 1000 || delta == 0 ) {
            delta = 1000/60 * 0.001;
        }
        count += delta;

        emitter.emit('frameUpdate', { time, delta , count });

        oldTime = time;
    } 

    animate();
}

