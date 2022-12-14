import { openInputFile } from '../../common'

type DirectionString = 'L'|'R'|'U'|'D';
type DirectionInput = {dirString: DirectionString, distance: number};
type Point = {x: number, y: number};
type Move = {dx: -1|0|1, dy: -1|0|1};

const data: DirectionInput[] = openInputFile(__dirname + '/input.txt')
    .split('\n')
    .map((line) => line.split(' '))
    .map((lineArr) => {
        return {
            dirString: lineArr[0] as DirectionString, 
            distance: parseInt(lineArr[1])
        };
    });

const moves: Record<DirectionString, Move> = {
    'L': {dx: -1, dy: 0},
    'R': {dx: 1, dy: 0},
    'U': {dx: 0, dy: -1},
    'D': {dx: 0, dy: 1}
}

function solution() {
    console.log(`Two knots: ${ropeSimulation(2)} unique tail positions`);
    console.log(`Ten knots: ${ropeSimulation(10)} unique tail positions`);
}

function ropeSimulation(numKnots: number): number {
    let knots: Point[] = [];
    
    for (let i = 0; i < numKnots; i++) {
        knots.push({x: 0, y: 0});
    }

    const head: Point = knots[0];
    const tail: Point = knots[knots.length - 1];
    let tailPositions: Point[] = [];
    let tailSet = new Set();

    for (let i = 0; i < data.length; i++) {
        const move: Move = moves[data[i].dirString];

        for (let n = 0; n < data[i].distance; n++) {
            //Head Tick
            head.x += move.dx;
            head.y += move.dy;
            //console.log(head)

            //Knots Tick
            for (let k = 1; k < numKnots; k++) {
                const knot = knots[k];
                const ahead = knots[k - 1];
                const yDistance = ahead.y - knot.y;
                const xDistance = ahead.x - knot.x;

                //Diagonal case
                if (Math.abs(yDistance) > 1 && Math.abs(xDistance) > 1) {
                    if (yDistance > 0) knot.y++;
                    else knot.y--;

                    if (xDistance > 0) knot.x++;
                    else knot.x--;
                }
                else if (Math.abs(yDistance) > 1) {
                    //'ahead' is below
                    knot.x = ahead.x;
                    if (yDistance > 0) {
                        knot.y = ahead.y - 1;
                    }
                    //'ahead' is above
                    else {
                        knot.y = ahead.y + 1;
                    }
                }
                else if (Math.abs(xDistance) > 1) {
                    //'ahead' is right
                    knot.y = ahead.y;
                    if (xDistance > 0) {
                        knot.x = ahead.x - 1;
                    }
                    //'ahead' is left
                    else {
                        knot.x = ahead.x + 1;
                    }
                }

                pushTailPosition(tailPositions, {x: tail.x, y: tail.y});
                tailSet.add(`${tail.x},${tail.y}`);
                //console.log(knot)
            }
        }
    }
    
    return tailSet.size;
}

function pushTailPosition(set: Point[], point: Point) {
    for (let member of set) {
        if (member.x === point.x && member.y === point.y) return;
    }

    set.push(point)
}

solution();