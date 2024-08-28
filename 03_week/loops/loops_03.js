// Create a program that continuously prompts the user to input distance (in kilometers) and time (in hours) and then calculates the average speed. The program should terminate when the user enters 0 for the distance. Upon receiving a distance of 0, the program should not prompt for any further input.



function averageSpeed() {
    while (true) {
        let km = prompt('How many kilometers?')
        if (km == 0) {break;}
        let h = prompt('How many hours?')
        console.log(`Your average speed is ${km/h} km/h`)
    }
}
