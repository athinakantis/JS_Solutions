// Develop a program that initially asks the user how many numbers they wish to input. After receiving this information, the program should then prompt the user to enter each of these numbers. Once all numbers have been entered, the program should determine and display the smallest and biggest number provided by the user.


function howManyTimes(){
    let times;

    // Loop to ensure user input is a positive integer
    while (true) { 
        times = +prompt('How many numbers do you wish to enter?')
        if (typeof times !== 'number' || isNaN(times)) {
            alert('Please enter a positive integer')
        } else if (times === 0) {
            alert('Please enter a positive integer')
        } else if (Math.sign(times) === -1) {
            alert('Number entered has to be positive')
        } else { break; }
    }


    let biggestNum, smallestNum;
    let total = 0;

    // Making sure user input is an integer
    for (let i = 0; i < times; i++){
        let num = +prompt('Enter a number')

        if (typeof num !== 'number' || isNaN(num)) {
            alert('Number has to be a positive or negative integer');
            i--
        } else if (biggestNum === undefined) {
            total += num
            biggestNum = num
            smallestNum = num
        } else if (num > biggestNum) {
            total += num
            biggestNum = num
        } else if (num < smallestNum) {
            total += num
            smallestNum = num
        }
    }

    console.log(`Average of all numbers entered is ${total/times}`)
    console.log(`Biggest number entered is ${biggestNum}`)
    console.log(`Smallest number entered is ${smallestNum}`)
}