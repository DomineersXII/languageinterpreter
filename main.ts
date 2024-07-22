export {}

const tocompile: string = await Deno.readTextFile("tocompile.txt")
const memory: number[] = new Array(30000).fill(0)

let pointerLocation: number = 0
let loopStart: number = 0
let word = ""

function createWord(letter: string) { //test function
    word += letter
}

function compileCharacter(char: string, position: number): number {
    if (char === "+") {
        memory[pointerLocation] = (memory[pointerLocation] + 1) % 256
    } else if (char === "-") {
        if (memory[pointerLocation] === 0) {
            memory[pointerLocation] = 255
        } else {
            memory[pointerLocation]--
        }
    } else if (char === "<") {
        if (pointerLocation === 0) {
            pointerLocation = (memory.length-1)
        } else {
            pointerLocation--
        }
    } else if (char === ">") {
        pointerLocation = (pointerLocation + 1) % memory.length
    } else if (char === ".") {
        const loggedLetter = String.fromCharCode(memory[pointerLocation])
        console.log(loggedLetter)

        createWord(loggedLetter) //for easy readability at end. not really part of the compiler
    } else if (char === ",") {
        const inputtedNumber = prompt("Input a number:")
        memory[pointerLocation] = Number(inputtedNumber)%256
    } else if (char === "[") {
        loopStart = position
    } else if (char === "]") {
        if (memory[pointerLocation] != 0) {
            position = loopStart
        } 
    } else {
        throw new Error("Invalid character at " + position)
    }

    return position
}


for (let i = 0; i < tocompile.length; i++) {
    const currentChar = tocompile.charAt(i)

    i = compileCharacter(currentChar, i)
}

console.log(word) //for testing