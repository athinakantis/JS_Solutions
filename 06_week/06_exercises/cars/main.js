
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
        let tr = document.createElement('tr')
        for (let i = 0; i < Object.keys(car).length; i++) {
            let td = document.createElement('td')
            td.textContent = Object.values(car)[i]
            tr.appendChild(td)
        }
        document.querySelector('tbody').appendChild(tr)
    })
}
initiateListings()





/* Listen for any new listings */
document.querySelector('#createListing').addEventListener('click', () => {
    let newCar = new Car(document.querySelector('#licensePlate').value,
                        document.querySelector('#maker').value,
                        document.querySelector('#model').value,
                        document.querySelector('#customerName').value,
                        document.querySelector('#price').value,
                        document.querySelector('#color').value)
    
    cars.push(newCar)
    updateListings(newCar)
})

function updateListings(car) {
    let tr = document.createElement('tr')
    for (let i = 0; i < Object.keys(car).length; i++) {
        let td = document.createElement('td')
        td.textContent = Object.values(car)[i]
        tr.appendChild(td)
    }
    document.querySelector('tbody').appendChild(tr)
}



/* Search functionality */
document.querySelector('#search').addEventListener('click', () => {
    let searchValue = document.querySelector('#searchbar').value
    if (searchValue !== 6) {
        document.querySelector('.reply').textContent = `Error: Please enter a valid license plate number. (6 letters and/or digits)`
    }

    for (let car of cars) {
        if (car.licensePlate === searchValue) {
            document.querySelector('.reply').textContent = `Car found: ${car.maker} ${car.model} listed by ${car.owner}`
        }
    }
})