import { openInputFile } from '../../common'

const data = openInputFile(__dirname + '/input.txt').split('\n').map((line) => line.split('').map((c) => parseInt(c)));
const HEIGHT = data.length;
const WIDTH = data[0].length;

type ViewDistance = {
    right: number,
    left: number,
    up: number,
    down: number
}

function solution() {    
    console.log(`Grid is ${WIDTH} x ${HEIGHT}`);
    
    //Part 1 answer
    console.log(`Trees visible from edge: ${getNumVisible()}`);

    //Part 2 answer
    console.log(`Highest scenic score: ${getMaxScenicScore()}`);
}

function getNumVisible() {
    //All trees along the edge are visible
    let visibleCount: number = (WIDTH * 2) + (HEIGHT * 2) - 4;
    console.log(`${visibleCount} edge trees`);

    //Skip edge trees in our check
    for (let x = 1; x < WIDTH - 1; x++) {
        for (let y = 1; y < HEIGHT - 1; y++) {
            const visible = isVisible(x, y);
            if (visible) visibleCount++;
        }
    }

    return visibleCount;
}

function getTreeHeight(x: number, y: number) {
    return data[y][x];
}

function getViewDistance(x: number, y: number): ViewDistance {
    let viewDistance: Record<'right'|'left'|'up'|'down', number> = {
        right: 0,
        left:  0,
        up:    0,
        down:  0
    }

    const maxHeight = getTreeHeight(x, y);

    //Right
    for (let checkX = x + 1; checkX < WIDTH; checkX++) {
        viewDistance.right++;
        if (getTreeHeight(checkX, y) >= maxHeight) break;
    }

    //Left
    for (let checkX = x - 1; checkX >= 0; checkX--) {
        viewDistance.left++;
        if (getTreeHeight(checkX, y) >= maxHeight) break;
    }

    //Up
    for (let checkY = y - 1; checkY >= 0; checkY--) {
        viewDistance.up++;
        if (getTreeHeight(x, checkY) >= maxHeight) break;            
    }

    //Down
    for (let checkY = y + 1; checkY < HEIGHT; checkY++) {
        viewDistance.down++;
        if (getTreeHeight(x, checkY) >= maxHeight) break;
    }

    return viewDistance;
}

function getScenicScore(x: number, y: number): number {
    const viewDistance: ViewDistance = getViewDistance(x, y);

    return viewDistance.right * 
        viewDistance.left * 
        viewDistance.up * 
        viewDistance.down;
}

function getMaxScenicScore(): number {
    let maxScore: number = 0;

    for (let x = 0; x < WIDTH - 1; x++) {
        for (let y = 0; y < HEIGHT - 1; y++) {
            const score = getScenicScore(x, y);
            if (score > maxScore) maxScore = score;
        }
    }

    return maxScore;
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