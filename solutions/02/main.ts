import { openInputFile } from '../../common'

class Move {
    name: string;
    points: number;
    defeats: Move | null;

    constructor(name: string, points: number, defeats?: Move) {
        this.name = name;
        this.points = points;
        this.defeats = defeats || null;
    }
}

function solution(): number {
    let rock = new Move("Rock", 1);
    let paper = new Move("Paper", 2);
    let scissors = new Move("Scissors", 3);

    rock.defeats = scissors;
    paper.defeats = rock;
    scissors.defeats = paper;

    const moveAliases: Record<string, Move> = {
        A: rock, B: paper, C: scissors,
        X: rock, Y: paper, Z: scissors
    };

    const data = openInputFile(__dirname + '/input.txt');
    const ROW_LENGTH = 4; //Each row of data input is 4 characters long
    let pointsTotal: number = 0;

    for (let i = 0; i < data.length; i += ROW_LENGTH) {
        const enemyMoveAlias = data[i];
        const playerMoveAlias = data[i+2];
        const enemyMove = moveAliases[enemyMoveAlias];
        const playerMove = moveAliases[playerMoveAlias];

        pointsTotal += calculateRoundPoints(enemyMove, playerMove);
    }

    console.log(`Total points: ${pointsTotal}`);
    return pointsTotal;
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