import { openInputFile } from '../common'

function solution(): number {
    const data = openInputFile(__dirname + '/input.txt').split('\n');
    let runningTotal: number = 0;
    let maximum: number = 0;

    for (let entry of data) {
        if (entry !== '') {
            runningTotal += parseInt(entry);
        }
        else {
            if (runningTotal > maximum) maximum = runningTotal;
            runningTotal = 0;
        }
    }

    return maximum;
}

console.log(solution());