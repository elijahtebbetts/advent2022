import { openInputFile } from '../../common'

const data = openInputFile(__dirname + '/input.txt').split('\n').map((line) => line.split('').map((c) => parseInt(c)));
const HEIGHT = data.length;
const WIDTH = data[0].length;

function solution() {    
    console.log(`Grid is ${WIDTH} x ${HEIGHT}`);

    let visibleCount = 0;
    let highestScenicScore = 0;

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const viewDistance: ViewDistance = getViewDistance(x, y);
            if (viewDistance.visible) visibleCount++;

            const scenicScore = getScenicScore(viewDistance);
            if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
        }
    }
    
    //Part 1 answer
    console.log(`Trees visible from edge: ${visibleCount}`);

    //Part 2 answer
    console.log(`Highest scenic score: ${highestScenicScore}`);
}

function getTreeHeight(x: number, y: number) {
    return data[y][x];
}

type ViewDistance = {
    right: number,
    left: number,
    up: number,
    down: number,
    visible?: boolean //true if tree is visible from outside any edge
}

type Visibility = {
    right: boolean,
    left: boolean,
    up: boolean,
    down: boolean
}

function getViewDistance(x: number, y: number): ViewDistance {
    let viewDistance: ViewDistance = {
        right: 0,
        left:  0,
        up:    0,
        down:  0
    }

    let visibility: Visibility = {
        right: true,
        left: true,
        up: true,
        down: true
    }

    const maxHeight = getTreeHeight(x, y);

    //Right
    for (let checkX = x + 1; checkX < WIDTH; checkX++) {
        viewDistance.right++;
        if (getTreeHeight(checkX, y) >= maxHeight) {
            visibility.right = false;
            break;
        }
    }

    //Left
    for (let checkX = x - 1; checkX >= 0; checkX--) {
        viewDistance.left++;
        if (getTreeHeight(checkX, y) >= maxHeight) {
            visibility.left = false;
            break;
        }
    }

    //Up
    for (let checkY = y - 1; checkY >= 0; checkY--) {
        viewDistance.up++;
        if (getTreeHeight(x, checkY) >= maxHeight) {
            visibility.up = false;
            break;
        }            
    }

    //Down
    for (let checkY = y + 1; checkY < HEIGHT; checkY++) {
        viewDistance.down++;
        if (getTreeHeight(x, checkY) >= maxHeight) {
            visibility.down = false;
            break;
        }
    }

    viewDistance.visible = visibility.right ||
        visibility.left ||
        visibility.up ||
        visibility.down

    return viewDistance;
}

function getScenicScore(viewDistance: ViewDistance): number {
    return viewDistance.right * 
        viewDistance.left * 
        viewDistance.up * 
        viewDistance.down;
}

solution();