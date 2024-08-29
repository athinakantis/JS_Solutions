// Develop a program that initially asks the user for a single number. Following this, the program should inquire if the user wishes to continue providing numbers with the prompt: 'Do you want to continue giving numbers? (y/n)'. If the user responds with 'y', the program will request another number. If the response is 'n', the program terminates. Upon termination, it calculates and displays the average of all entered numbers.

function anotherOne() {
    let enteredNums = []

    while (true) {
        let num = +prompt('Please provide a number')
        
        if (typeof num !== 'number' || isNaN(num)) {
            alert('Please enter a valid number')
        } else {
            enteredNums.push(num)
            let confirmation = confirm('Would you like to provide more numbers?')
            if (!confirmation) {break}
            continue;
        }

    }

    let total = enteredNums.reduce((a,b) => a + b)
    alert(`Total average of all numbers is ${total/enteredNums.length}`)
}