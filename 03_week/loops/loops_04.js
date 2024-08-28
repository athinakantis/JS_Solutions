// Develop a program that requests the user to input 20 numbers. After all numbers are entered, the program should display how many of these numbers are even. Do not use array.

function howManyEven() {
    let count = 0
    for (let i = 0; i < 20; i++){
        let num = prompt('Please write a number')
        if (num % 2 === 0) {count++}
    }
    console.log(`You wrote ${count} equal numbers`)
}