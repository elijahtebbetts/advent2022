import { openInputFile } from '../../common'

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');

    for (let sack of data) {
        const firstHalf = sack.slice(sack.length / 2);
        const secondHalf = sack.slice(sack.length / 2, sack.length);
        
        console.log(findCommonItem(firstHalf, secondHalf));
    }
}

function findCommonItem(a: string, b: string): string {
    for (let item of a) {
        if (b.includes(item)) return item;
    }

    console.error("Compartments have no items in common. Exiting.");
    process.exit();
}

solution();