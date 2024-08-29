// Develop a program that continuously prompts the user to input numbers until the user enters 0, at which point the program terminates. After termination, the program should calculate and display the average of all the entered numbers.

function averageNum(){
    let total = 0
    let count = 0

    do {
        let num = +prompt('Write a number')
        if (num === 0) {break;}
        total += num; 
        count += 1;
    } while (num !== 0);
    
    alert(`The average of all numbers entered is ${total/count}`)
}
