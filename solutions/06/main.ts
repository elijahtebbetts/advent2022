import { openInputFile } from '../../common'

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('');
    const BUFFER_LENGTH = 14;
    let buffer: string[] = [];

    //Fill our buffer with the first n characters
    for (let i = 0; i < BUFFER_LENGTH; i++) {
        buffer.push(data.shift() as string)
    }

    function incrementBuffer() {
        buffer.shift();
        buffer.push(data.shift() as string);
    }

    function bufferIsUnique() {
        let set = new Set();
        
        for (let char of buffer) {
            set.add(char);
        }

        return set.size === BUFFER_LENGTH;
    }

    let startFound:boolean = false;
    let numProcessed = BUFFER_LENGTH;

    while(data.length > 0) {
        console.log(buffer);
        if (bufferIsUnique()) {
            startFound = true;
            break;
        }
        else {
            numProcessed++;
            incrementBuffer();
        }
    }

    if (startFound) {
        console.log(numProcessed);
    }
    else {
        console.log("Unique buffer not found");
    }

    
}

solution();