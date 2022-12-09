import { openInputFile } from '../../common'

function solution() {
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
}

solution();