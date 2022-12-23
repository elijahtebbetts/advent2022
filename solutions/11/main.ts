import { openInputFile } from '../../common'

const data = openInputFile(__dirname + '/input.txt').split('\n')
let monkies: Monkey[] = [];

class Monkey {
    constructor(
        public items: number[] = [],
        public operation: {sign: string, val: number},
        public testInput: number,
        public throwOnTrue: number,
        public throwOnFalse: number
    ) {}

    inspect() {        
        if (this.operation.sign === '+') {
            if (isNaN(this.operation.val)) this.items[0] += this.items[0]
            else this.items[0] += this.operation.val;
        }
        else if (this.operation.sign === '*') {
            if (isNaN(this.operation.val)) this.items[0] *= this.items[0];
            else this.items[0] *= this.operation.val;
        }

        this.items[0] = Math.floor(this.items[0] / 3);

        return this.items[0];
    }

    throw() {
        if (this.items[0] % this.testInput === 0) {
            monkies[this.throwOnTrue].items.push(this.items.shift() || 0)
        }
        else {
            monkies[this.throwOnFalse].items.push(this.items.shift() || 0)
        }
    }
}



function solution() {
    while (data.length > 0) {
        data.shift()
        const startingItems = data.shift()
            ?.split(': ')[1]
            .split(', ')
            .map((n) => parseInt(n));

        const operation = data.shift()
            ?.split('old ')[1]
            .split(' ') || [''];

        const testInput = parseInt(data.shift()?.split(' ').pop() || '');
        const throwOnTrue = parseInt(data.shift()?.split(' ').pop() || '');
        const throwOnFalse = parseInt(data.shift()?.split(' ').pop() || '');

        monkies.push(new Monkey(
            startingItems,
            {sign: operation[0], val: parseInt(operation[1]) },
            testInput,
            throwOnTrue,
            throwOnFalse
        ));

        data.shift();
    }

    //console.log(monkies);
}


solution();