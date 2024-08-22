/**
Write a function named gradeChecker that takes a number (representing a student's grade) as a parameter and returns a grade classification as follows:

"A" for grades 90 and above
"B" for grades 80-89
"C" for grades 70-79
"D" for grades 60-69
"F" for grades below 60
*/

function gradeChecker(g) {
    if (g >= 90) {
        return 'A'
    } else if (g >= 80) {
        return 'B'
    } else if (g >= 70) {
        return 'C'
    } else if (g >= 60) {
        return 'D'
    } else {
        return 'F'
    }
}

// Sample usage - do not modify
console.log(gradeChecker(90)); // Outputs: "A"
console.log(gradeChecker(80)); // Outputs: "B"
console.log(gradeChecker(70)); // Outputs: "C"
console.log(gradeChecker(60)); // Outputs: "D"
console.log(gradeChecker(50)); // Outputs: "F"
