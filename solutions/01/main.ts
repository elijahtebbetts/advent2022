import { openInputFile } from '../../common'

function solution(): number {
    const data = openInputFile(__dirname + '/input.txt').split('\n');
    let runningTotal: number = 0;
    let first:number = 0;
    let second:number = 0;
    let third:number = 0;

    for (let entry of data) {
        if (entry !== '') {
            runningTotal += parseInt(entry);
        }
        else {
            if (runningTotal > first) {
                third = second;
                second = first;
                first = runningTotal;
            } 
            else if (runningTotal > second) {
                third = second;
                second = runningTotal;
            }
            else if (runningTotal > third) {
                third = runningTotal;
            }
            
            runningTotal = 0;
        }
    }

    return first + second + third;
}

console.log(solution());