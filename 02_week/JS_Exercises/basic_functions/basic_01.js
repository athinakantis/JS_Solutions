// Write the function sum such that it returns the sum of a and b.
function sum(...args) {
    return args.reduce((a, b) => a + b)
}

// sample usage - do not modify
console.log(sum(1, 3, 5));
console.log(sum(2, 5));
