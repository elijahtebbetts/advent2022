import { readFileSync } from 'fs';

export function openInputFile(path: string): string {
    try {
        const input: string = readFileSync(path, 'utf8');
        return input;
    } catch (err) {
        console.error(err);
        process.exit()
    }
}