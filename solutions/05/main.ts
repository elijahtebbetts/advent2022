import { openInputFile } from '../../common'

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');

    const NUM_STACKS = 9;
    let stacks:string[][] = [];  //Stacks for part 1
    let stacks2:string[][] = []; //Stacks for part 2

    //Create the number of empty stacks that we need
    for (let i = 0; i < NUM_STACKS; i++) {
        stacks.push([]);
        stacks2.push([]);
    }

    const ITEM_OFFSET = 4; //Items are 4 characters apart in the input data
    
    //'row' is defined outside of the loop in order to carry
    //it forward to the next one once we are done processing
    //the initial state of the stacks
    let row;

    //The condition in this loop is a way of detecting the stack
    //labels in the input data.
    for (row = 0; data[row] !== ''; row++) {
        for (let stack = 0; stack < NUM_STACKS; stack++) {
            const item: string = data[row][stack * ITEM_OFFSET + 1];
            
            if (item != ' ') {
                stacks[stack].unshift(item);
                stacks2[stack].unshift(item);
            }
        }
    }
    
    const NUM_INDEX = 1;
    const STACK_FROM_INDEX = 3;
    const STACK_TO_INDEX = 5;
    
    //Row is currently pointing to empty line, so move it forward
    //by one to get to the instruction data
    for (row += 1; row < data.length; row++) {
        const instruction = data[row].split(' ');
        const num = parseInt(instruction[NUM_INDEX]);
        const from = parseInt(instruction[STACK_FROM_INDEX]) - 1;
        const to = parseInt(instruction[STACK_TO_INDEX]) - 1;

        //Stack manipulation for part 1
        for (let i = 0; i < num; i++) {
            const item = stacks[from].pop();
            if (item) stacks[to].push(item);
        }

        //Stack manipulation for part 2
        let toMove: string[] = [];
        for (let i = 0; i < num; i++) {
            const item = stacks2[from].pop();
            if (item) toMove.unshift(item);
        }

        stacks2[to] = stacks2[to].concat(toMove);
    }

    //Print part 1 answer
    let topString = '';
    for (let stack of stacks) {
        topString += stack.pop();
    };
    console.log(topString);

    //Print part 2 answer
    topString = '';
    for (let stack of stacks2) {
        topString += stack.pop();
    };
    console.log(topString);
}

solution();