import { openInputFile } from '../../common.js'

function solution() {
    const data = openInputFile(__dirname + '/input.txt').split('\n');
    data.shift();

    class Directory {
        constructor(
            public name: string,
            public parent: Directory | null,
            public contents: (File | Directory)[]
        ) {}
    }

    class File {
        constructor (
            public name: string,
            public parent: Directory,
            public size: number
        ) {}
    }

    let root = new Directory("/", null, [])
    let directories: Directory[] = [root];
    let currentDirectory: Directory = root;
    
    while(data.length > 0) {
        const line = data.shift();
        if (line) {
            const cmd = line.split(' ');
            
            if (cmd[0] === '$') {
                if (cmd[1] === 'cd') {
                    if (cmd[2] === '..')
                        up();
                    else
                        cd(cmd[2]);
                }
            }
            else if (cmd[0] === 'dir') {
                addDir(cmd[1]);
            }
            else {
                addFile(cmd[1], parseInt(cmd[0]));
            }
        }
    }

    findDirectoriesUnderSize();

    function findDirectoriesUnderSize(maxSize: number = 100000) {
        let dirCount = 1;
        let totalSize = 0;

        for (let dir of directories) {
            const size = getDirSize(true, dir);
    
            if (size < maxSize) {
                console.log(`${dirCount}: ${dir.name} ${size}`);
                totalSize += size;
                dirCount++;
            }
        }

        console.log(totalSize);
    }

    function up() {
        if (currentDirectory.parent)
            currentDirectory = currentDirectory.parent
    }

    function cd(name: string) {
        for (let child of currentDirectory.contents) {
            if (child instanceof Directory && child.name === name) {
                currentDirectory = child;
            }
        }
    }

    function pwd() {
        let pathPointer = currentDirectory;

        let pathString: string = '';

        while (pathPointer.parent) {
            pathString = `${pathPointer.name}/` + pathString;
            pathPointer = pathPointer.parent;
        }

        return `/${pathString}`;
    }

    function addDir(name:string = "New Directory") {
        const newDir = new Directory(name, currentDirectory, [])
        currentDirectory.contents.push(newDir);
        directories.push(newDir);
    }

    function addFile(name: string = "New File", size: number = 0) {
        const newFile = new File(name, currentDirectory, size)
        currentDirectory.contents.push(newFile);
    }

    function ls() {
        console.log(`listing ${pwd()}`);
        for (let child of currentDirectory.contents) {
            if (child instanceof Directory)
                console.log(`dir ${child.name}`);
            else
                console.log(`${child.size} ${child.name}`);
        }
    }

    function getDirSize(recursive: boolean = false, dir: Directory = currentDirectory): number {
        let size: number = 0;

        for (let child of dir.contents) {
            if (child instanceof File) {
                size += child.size;
            }
            else if (recursive) {
                size += getDirSize(true, child);
            }
        }

        return size;
    }
}

solution();