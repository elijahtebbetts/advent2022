import { openInputFile } from '../../common'

const data = openInputFile(__dirname + '/input.txt').split('\n').map((line) => line.split('').map((c) => parseInt(c)));
const HEIGHT = data.length;
const WIDTH = data[0].length;

function solution() {
    
    console.log(`Grid is ${WIDTH} x ${HEIGHT}`);

    //All trees along the edge are visible
    let visibleCount: number = (WIDTH * 2) + (HEIGHT * 2) - 4;
    console.log(`${visibleCount} edge trees`);

    for (let x = 1; x < WIDTH - 1; x++) {
        for (let y = 1; y < HEIGHT - 1; y++) {
            const visible = isVisible(x, y);
            //console.log(`${x}, ${y}: ${visible}`);

            if (visible) visibleCount++;
        }
    }

    console.log(`${visibleCount} trees visible`)
}

function isVisible(x:number, y:number): boolean {
    const height = data[y][x];
    let visible = true;
    
    //Right
    for (let checkX = x+1; checkX < WIDTH; checkX++) {
        if (data[y][checkX] >= height) {
            visible = false;
            break;
        }
    }

    if (visible) return true;
    visible = true;

    //Left
    for (let checkX = x-1; checkX >= 0; checkX--) {
        if (data[y][checkX] >= height) {
            visible = false;
            break;
        }
    }

    if (visible) return true;
    visible = true;

    //Up
    for (let checkY = y - 1; checkY >= 0; checkY--) {
        if (data[checkY][x] >= height) {
            visible = false;
            break;
        }
    }

    if (visible) return true;
    visible = true;

    //Down
    for (let checkY = y + 1; checkY < HEIGHT; checkY++) {
        if (data[checkY][x] >= height) {
            visible = false;
            break;
        }
    }

    if (visible) return true;
    
    return false;
}

solution();