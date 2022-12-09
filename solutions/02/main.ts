import { openInputFile } from '../../common'

class Move {
    name: string;
    points: number;
    defeats: Move | null;
    weakness: Move | null;

    constructor(name: string, points: number, defeats?: Move, weakness?: Move) {
        this.name = name;
        this.points = points;
        this.defeats = defeats || null;
        this.weakness = weakness || null;
    }
}

function solution() {
    let rock = new Move("Rock", 1);
    let paper = new Move("Paper", 2);
    let scissors = new Move("Scissors", 3);

    rock.defeats = scissors;
    paper.defeats = rock;
    scissors.defeats = paper;
    rock.weakness = paper;
    paper.weakness = scissors;
    scissors.weakness = rock;

    const moveAliases: Record<string, Move> = {
        A: rock, B: paper, C: scissors,
        X: rock, Y: paper, Z: scissors
    };

    const data = openInputFile(__dirname + '/input.txt');
    const ROW_LENGTH = 4; //Each row of data input is 4 characters long
    let partOnePoints: number = 0;

    for (let i = 0; i < data.length; i += ROW_LENGTH) {
        const firstAlias = data[i];
        const secondAlias = data[i+2];
        const enemyMove = moveAliases[firstAlias];
        const playerMove = moveAliases[secondAlias];
        partOnePoints += calculateRoundPoints(enemyMove, playerMove);
    }

    console.log(`Total points (Part 1): ${partOnePoints}`);
}


function createOutcome(enemyMove: Move, outcomeAlias: 'X'|'Y'|'Z'): Move {
    const LOSE = 'X';
    const DRAW = 'Y';
    const WIN = 'Z';

    if (outcomeAlias === WIN && enemyMove.weakness) return enemyMove.weakness;
    else if (outcomeAlias === LOSE && enemyMove.defeats) return enemyMove.defeats;
    else if (outcomeAlias === DRAW) return enemyMove;
    else {
        console.error("Unable to find move for desired outcome. Exiting.");
        process.exit();
    }
}

function calculateRoundPoints(enemyMove: Move, playerMove: Move): number {
    const DRAW_VALUE = 3;
    const WIN_VALUE = 6;

    let points: number = playerMove.points;

    if (playerMove.defeats === enemyMove) {
        points += WIN_VALUE;
    }
    else if (playerMove === enemyMove) {
        points += DRAW_VALUE;
    }

    return points;
}

solution();