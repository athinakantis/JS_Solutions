/* Make a program that asks ten numbers. Program calculates and prints out sum and average, also prints out the smallest and biggest number. */

function tenNumbers(){
    let total = 0;
    let smallestNum = undefined;
    let biggestNum = undefined;

    for (let i = 0; i < 10; i++){
        let num = +prompt('Please enter a total of 10 numbers, one at a time:')
        if (smallestNum === undefined && biggestNum === undefined) {
            smallestNum = num
            biggestNum = num
        } else if (num > biggestNum) {
            biggestNum = num
        } else if (num < smallestNum) {
            smallestNum = num
        }
        total += num;
    }

    console.log(`Average of all numbers is ${total/10}`)
    console.log(`Smallest number entered is ${smallestNum}`)
    console.log(`Biggest number entered ${biggestNum}`)
}