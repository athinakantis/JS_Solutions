/*
- Create a variable named 'num1' and assign it a floating-point value.
- Create a variable named 'num2' and assign it a different floating-point value.

- Round both 'num1' and 'num2' to the nearest integer and store the results in variables 'roundedNum1' and 'roundedNum2'.
- Calculate the square root of 'roundedNum1' and store it in a variable named 'sqrtNum1'.
- Find the larger number between 'roundedNum1' and 'roundedNum2' and store it in a variable named 'maxNum'.

- Use console.log() to print 'roundedNum1', 'roundedNum2', 'sqrtNum1', and 'maxNum' to the console.
- Use the typeof operator to check the data type of each new variable and print the result using console.log().
*/

const num1 = 1.7
const num2 = 2.8

const roundedNum1 = Math.round(num1)
const roundedNum2 = Math.round(num2)

const sqrtNum1 = Math.sqrt(roundedNum1)

const maxNum = Math.max(roundedNum1, roundedNum2)

console.log('Rounded num1: ' + roundedNum1, typeof roundedNum1)
console.log('Rounded num2: ' + roundedNum2, typeof roundedNum2)
console.log('Squared num1: ' +sqrtNum1, typeof sqrtNum1)
console.log('Maxnum: ' + maxNum, typeof maxNum)