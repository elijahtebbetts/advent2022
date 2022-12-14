import { openInputFile } from '../../common'

type Instruction = {op: string, val: number}
const data = openInputFile(__dirname + '/input.txt').split('\n')
const log: number[] = [1];

const SCREEN_WIDTH = 40;
const SCREEN_HEIGHT = 6;
let screen: (string)[][] = [[]];
for (let row = 0; row < SCREEN_HEIGHT; row++) {
    screen.push(Array());

    for (let pixel = 0; pixel < SCREEN_WIDTH; pixel++) {
        screen[row].push('.');
    }
}

type CPU = {
    cycle: number,
    x: number
}

function solution() {
    let cpu: CPU = {
        cycle: 1,
        x: 1,
    }

    let interesting: number[] = [20, 60, 100, 140, 180, 220];

    //Process input stack
    for (const line of data) {
        const lineArr = line.split(' ');
        const op = lineArr[0];
        const val: number = parseInt(lineArr[1]);
        exec(cpu, op, val);
    }
    
    let strSum = 0;

    console.log('Cycle\tValue\tSignal Str.')
    for (let n of interesting) {
        const val = log[n-1];
        const str = n * val;
        console.log(`${n}\t${val}\t${str}`);
        strSum += str;
    }
    console.log(`\nStrengths sum: ${strSum}`);
}

function exec(cpu: CPU, op: string, val?: number) {
    if (op === 'addx' && val) {
        exec(cpu, 'noop');
        cpu.x += val;
    }
    
    log.push(cpu.x);
    cpu.cycle++;
    render(cpu);
}

function render(cpu: CPU) {
    const col = (cpu.cycle - 1) % SCREEN_WIDTH;
    let row = Math.floor((cpu.cycle - 1) / SCREEN_WIDTH) % SCREEN_HEIGHT;
    
    console.log(`${row} ${col}`);
    if (Math.abs(cpu.x - col) <= 1)
        screen[row][col] = '#';

    for (let row of screen) {
        let rowStr = '';
        for (let pixel of row) {
            rowStr += pixel;
        }
        console.log(rowStr);
    }
}

solution();