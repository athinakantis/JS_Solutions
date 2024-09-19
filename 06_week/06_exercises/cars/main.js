
/* Car class and array */
const cars = [{
    licensePlate: 'ABC123',
    maker: 'Toyota',
    model: 'Corolla',
    owner: 'John Doe',
    price: 5000,
    color: 'Midnight Blue'
    }]


class Car {
    constructor(licensePlate, maker, model, owner, price, color) {
        this.licensePlate = licensePlate,
        this.maker = maker,
        this.model = model,
        this.owner = owner,
        this.price = price,
        this.color = color
    } 
}


/* Loop through car array to display listings */
function initiateListings() {
    cars.forEach((car) => {
        updateListings(car)
    })
}

initiateListings()



// Add event listeners to form instead of the button
const newListingForm = document.querySelector('#newListing')
const searchForm = document.querySelector('#searchForm')


/* Listen for any new listings */
newListingForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const reply = document.querySelector('.newListingContainer > p')

    for (let input of e.target) {
        if (input.value.length < 1) {
            reply.textContent = `Please fill in all fields!`
            return setTimeout(() => reply.textContent = '', 3000)

        } else if (e.target[1].value == 0) {
            e.target[1].focus()
            reply.textContent = `Please select a car maker`
            return setTimeout(() => reply.textContent = '', 3000)
        }
    }

    const newCar = new Car(e.target[0].value,
                        e.target[1].value,
                        e.target[2].value,
                        e.target[3].value,
                        e.target[4].value,
                        e.target[5].value)
    
    cars.push(newCar)
    updateListings(newCar)
    reply.textContent = `Your new listing has been created!`
    setTimeout(() => reply.textContent = '', 3000)
})

function updateListings(car) {
    const tbody = document.querySelector('tbody')
    const tr = tbody.insertRow(-1)
    for (let i = 0; i < 6; i++) {
        const td = tr.insertCell()
        td.textContent = Object.values(car)[i]
    }
}



/* Search functionality */
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = e.target[0].value
    const reply = document.querySelector('.reply')
    const regex = new RegExp(/^[A-Za-z]{3}\d{3}$/)


    if (!regex.test(searchValue)) {
        reply.textContent = `Error: Please enter a valid license plate number. (3 letters followed by 3 numbers)`
        return setTimeout(() => reply.textContent = '', 3000)
    }


    const car = cars.find((car) => car.licensePlate === searchValue)

    if (car) {
        return reply.textContent = `Car found: ${car.maker} ${car.model} listed by ${car.owner}`
    } else {
        reply.textContent = `No car with license plate ${searchValue} found. Check spelling and try again`
        return setTimeout(() => reply.textContent = '', 3000)
    
    }
})

