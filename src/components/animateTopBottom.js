
export function animateTopBottom (mesh) {
    if (mesh.position.y != 0) return;

    const obj = mesh

    const dist = 20
    const len = 70
    const time = 500
    let currentHum = 0
    
    const toTop = () => {
        if (currentHum > len) { 
            currentHum = 0
            return;
        }
        currentHum ++;
        setTimeout(() => { 
                obj.position.y += dist / len
                toTop() 
            }, time / len)
    }
    toTop()

    const toBottom = () => {
        if (currentHum > len) { 
            obj.position.y = 0
            return;
        }
        currentHum ++;
        setTimeout(() => { 
                obj.position.y -= dist / len
                toBottom() 
            }, time / len)
    }
    setTimeout(toBottom, 2000)
}