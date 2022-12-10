import { openInputFile } from '../../common'

class Assignment {
    constructor(
        public firstSection: number,
        public lastSection: number
    ) {}

    //Returns true if 'other' is fully contained within this assignment
    contains(other: Assignment): boolean {
        return other.firstSection >= this.firstSection
            && other.lastSection <= this.lastSection;
    }

    //Returns true if there is any overlap between this assignment and 'other'
    overlaps(other: Assignment): boolean {
        return other.firstSection >= this.firstSection && other.firstSection <= this.lastSection
            || other.lastSection <= this.lastSection && other.lastSection >= this.firstSection
            || other.lastSection > this.lastSection && other.firstSection < this.lastSection;
    }
}

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');
    let containsCount = 0;
    let overlapsCount = 0;

    for (let line of data) {
        const pairData = line.split(',').map((range) => range.split('-').map((n) => parseInt(n)));
        const assignmentA = new Assignment(pairData[0][0], pairData[0][1]);
        const assignmentB = new Assignment(pairData[1][0], pairData[1][1]);
        
        if (assignmentA.contains(assignmentB) || assignmentB.contains(assignmentA))
            containsCount++;

        if (assignmentA.overlaps(assignmentB))
            overlapsCount++;
    }

    console.log(`Fully contained: ${containsCount}`);
    console.log(`Overlapping: ${overlapsCount}`);
}

solution();