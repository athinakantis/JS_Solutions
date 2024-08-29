// Develop a program that continuously prompts the user to input numbers until the user enters 0, at which point the program terminates. After termination, the program should calculate and display the average of all the entered numbers.

function averageNum(){
    let enteredNums = []

    while (true) {
        let num = +prompt('Write a number')
        if (num === 0) {break;}
        else if (typeof num !== 'number' || isNaN(num)) {
            alert('Please enter an integer')
        } else {
            enteredNums.push(num)
        }
    }
    let total = enteredNums.reduce((a,b) => a + b)
    alert(`The average of all numbers entered is ${total/enteredNums.length}`)
}

