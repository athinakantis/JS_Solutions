// Develop a program that initially asks the user for a single number. Following this, the program should inquire if the user wishes to continue providing numbers with the prompt: 'Do you want to continue giving numbers? (y/n)'. If the user responds with 'y', the program will request another number. If the response is 'n', the program terminates. Upon termination, it calculates and displays the average of all entered numbers.

function anotherOne() {
    let total = 0; let count = 0;
    
    while (true) {
        let num = +prompt('Please provide a number')

        if (isNaN(num)) {
            alert('Please provide a valid integer')
        } else {
            total += num; 
            count++;
            let confirmation = confirm('Would you like to provide more numbers?')
            if (confirmation) {continue}
            break;
        }
    }
    console.log(`Total average of all numbers is ${total/count}`)
}