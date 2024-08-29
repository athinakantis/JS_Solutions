/* Make a program that asks ten numbers. Program calculates and prints out sum and average, also prints out the smallest and biggest number. */

function tenNumbers(){
    let total = 0;
    let smallestNum = Infinity
    let biggestNum = -Infinity

    for (let i = 0; i < 10; i++){
        let num = +prompt('Please enter a total of 10 numbers, one at a time:')

        if(isNaN(num)) {
            alert('Please enter valid a valid integer!');
            i--
        } else if (num < smallestNum) {
            smallestNum = num
        } else if (num > biggestNum) {
            biggestNum = num
        }
        total += num;
    }

    console.log(`Average of all numbers is ${total/10}`)
    console.log(`Smallest number entered is ${smallestNum}`)
    console.log(`Biggest number entered ${biggestNum}`)
}