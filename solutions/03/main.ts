import { openInputFile } from '../../common'

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');

    let prioritySum = 0;
    for (let sack of data) {
        const firstHalf = sack.slice(0, sack.length / 2);
        const secondHalf = sack.slice(sack.length / 2, sack.length);
        const commonItem = findCommonItem(firstHalf, secondHalf);

        prioritySum += calculatePriority(commonItem);
    }

    let badgesPrioritySum = 0;
    for (let i = 0; i < data.length; i += 3) {
        const badge = findBadge(data[i], data[i + 1], data[i + 2]);
        badgesPrioritySum += calculatePriority(badge);
    }

    console.log(prioritySum, badgesPrioritySum)
}

function calculatePriority(item: string): number {
    const UPPERCASE_LIMIT = 90;
    const UPPERCASE_OFFSET = 64;
    const LOWERCASE_OFFSET = 96;
    const charCode = item.charCodeAt(0);
    
    if (charCode <= UPPERCASE_LIMIT) 
        return charCode - UPPERCASE_OFFSET + 26;
    else 
        return charCode - LOWERCASE_OFFSET;
}

function findBadge(a: string, b: string, c: string): string {
    for (let item of a) {
        if (b.includes(item) && c.includes(item)) return item;
    }

    console.error("Unable to find badge. Exiting.");
    process.exit();
}

function findCommonItem(a: string, b: string): string {
    for (let item of a) {
        if (b.includes(item)) return item;
    }

    console.error("Compartments have no items in common. Exiting.");
    process.exit();
}

solution();