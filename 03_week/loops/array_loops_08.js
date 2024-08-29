// Develop a program that initially asks the user how many numbers they wish to input. After receiving this information, the program should then prompt the user to enter each of these numbers. Once all numbers have been entered, the program should determine and display the smallest and biggest number provided by the user.


function howManyTimes(){
    let times = prompt('How many numbers do you wish to enter?')
    let enteredNums = []

    for (let i = 0; i < times; i++){
        let num = +prompt('Enter a number')

        if (typeof num !== 'number' || isNaN(num)) {
            alert('Number has to be a positive or negative integer');
            times++
        } else {
            enteredNums.push(num)
        }
    }

    let total = enteredNums.reduce((a,b) => a + b)
    console.log(`Average of all numbers entered is ${total/times}`)
    console.log(`Biggest number entered is ${Math.max(...enteredNums)}`)
    console.log(`Smallest number entered is ${Math.min(...enteredNums)}`)
}