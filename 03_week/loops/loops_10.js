// Make a programm which will take in a string as an argument and will reverse it.

function reverseStr() {
    let str = prompt('Enter your name')

    str = str.split('').reverse().join('')
    alert(`Hello ${str}!`)
}
