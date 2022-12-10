import { openInputFile } from '../../common'

class Assignment {
    constructor(
        public firstSection: number,
        public lastSection: number
    ) {}

    contains(other: Assignment): boolean {
        return other.firstSection >= this.firstSection
            && other.lastSection <= this.lastSection;
    }
}

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');
    let overlapCount = 0;

    for (let line of data) {
        const pairData = line.split(',').map((range) => range.split('-').map((n) => parseInt(n)));
        const assignmentA = new Assignment(pairData[0][0], pairData[0][1]);
        const assignmentB = new Assignment(pairData[1][0], pairData[1][1]);
        
        if (assignmentA.contains(assignmentB) || assignmentB.contains(assignmentA))
            overlapCount++;
    }

    console.log(overlapCount);
}

solution();