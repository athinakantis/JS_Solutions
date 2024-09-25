
const licensePlateRegex = new RegExp(/^[A-Za-z]{3}\d{3}$/)
const thisYear = new Date().getFullYear()


const newName = document.querySelector('#customerName')
const newLicense = document.querySelector('#licensePlate')
const newMaker = document.querySelector('#maker')
const newModel = document.querySelector('#model')
const newColor = document.querySelector('#color')
const newYear = document.querySelector('#year')
const newPrice = document.querySelector('#price')

const searchReply = document.querySelector('#searchReply')
const newListingsReply = document.querySelector('#newListingsReply')


const listingsTable = document.querySelector('.listings tbody')
const searchTable = document.querySelector('.searchResults tbody')


//Makes sure the max attribute of year input is set to the current year
newYear.setAttribute('max', thisYear)





/* Car class and array */
const cars = []

class Car {
    constructor(licensePlate, maker, model, owner, year, color, price) {
        this.licensePlate = licensePlate
        this.maker = maker
        this.model = model
        this.owner = owner
        this.year = year
        this.color = color
        this.price = price
    } 

    discountPrice() {
        return this.price * 0.85
    }

}

//Example Cars
cars.push(new Car('ABC123', 'Toyota', 'Corolla', 'John Doe', 2024, 'Midnight Blue', 5000))
cars.push(new Car('ZZZ999', 'Hyundai', 'IONIC 6', 'Jane Doe', 2000, 'Red', 4000))


initiateListings(cars)




function validateName() {
    let customerName = newName.value
    return customerName.trim()
}


newLicense.addEventListener('input', () => {
    if (newLicense.validity.patternMismatch) {
        newLicense.setCustomValidity('Please enter a license plate in the following format: ABC123')
    } else {
        newLicense.setCustomValidity('')
    }
})


let modelFilter;
newMaker.addEventListener('change', (e) => {
    e.preventDefault()
    const modeldropdown = Array.from(document.querySelectorAll('optgroup'))
    if (modelFilter) {
        modelFilter.classList.toggle('hidden')
    }
    modelFilter = modeldropdown.find((category) => category.label === newMaker.value)
    modelFilter.classList.toggle('hidden')
})

function validateLicense() {
    return newLicense = newLicense.toUpperCase()
}

function showMessage(replyField, message) {
    replyField.textContent = message
    setTimeout(() => replyField.textContent = '', 3000)
}




/* Loop through car array to display listings */
function initiateListings(arr) {
    arr.forEach((car) => {
        updateListings(car, listingsTable)
    })
}



// Add event listeners to form instead of the button
const newListingForm = document.querySelector('#newListing')
const searchForm = document.querySelector('#searchForm')


/* Listen for any new listings */
newListingForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const customerName = validateName()
    const license = validateLicense()
    
    
    const newCar = new Car(license, newMaker.value, newModel.value, customerName, newYear.value, newColor.value, newPrice.value)
        

    cars.push(newCar)
    updateListings(newCar)
    resetListingsForm()

    showMessage(newListingsReply, `Your new listing has been created!`)
})



function resetListingsForm() {
    newName.value = ''
    newLicense.value = ''
    newMaker.value = 'Default'
    newModel.value = 'Default'
    newColor.value = ''
    newYear.value = ''
    newPrice.value = ''
}





function updateListings(car, tableBody) {
    let price = car.price
    let priceTd = `<td>$${price}</td>`
    if (thisYear - car.year > 10) {
        price = car.discountPrice()
        priceTd = `<td class='hasDiscount'>$${price}</td>`
    }

    
    /* Reaplace this */
    const tr = tableBody.insertRow(-1)
    for (let i = 0; i < 6; i++) {
        let td = document.createElement('td')
    }
    tr.innerHTML = `<td>${car.licensePlate}</td>
                    <td>${car.maker}</td>
                    <td>${car.model}</td>
                    <td>${car.owner}</td>
                    <td>${car.year}</td>
                    <td>${car.color}</td>
                    ${priceTd}
                    `
    tableBody.appendChild(tr)
}





/* Search functionality */
const searchbar = document.querySelector('#searchbar')
const filterLicense = document.querySelector('#filterLicense')
const filterDiscount = document.querySelector('#filterDiscount')



searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = searchbar.value

    if (filterYear.checked) {

    }
})


function searchLicensePlate() {
    const searchValue = searchbar.value
    const car = cars.find((car) => car.licensePlate === searchValue)
    
    if (car) {
        return `Car found: ${car.maker} ${car.model} listed by ${car.owner}`
    } else {
        return `No car with license plate ${searchValue} found. Check spelling and try again`
    }
}


function searchDiscounts() {
    const searchValue = +searchbar.value
    const filteredCars = cars.filter((car) => car.year > 10)

    updateListings(filteredCars, searchTable)
    searchTable.classList.remove('hidden')
}








/* Drop down menu. 
 */
let opened = false;
document.querySelector('#menuIcon').addEventListener('click', () => {
    const menu = document.querySelector('nav ul div')

    if (!opened) {
        menu.style.scale = '1'
        return opened = true
    } else {
        menu.style.scale = '0'
        return opened = false;
    }
})


document.querySelector('#searchIcon').addEventListener('click', toggleSearch)
document.querySelector('#returnIcon').addEventListener('click', toggleSearch)


function toggleSearch() {
    document.querySelector('.searchContainer').classList.toggle('hidden')
    document.querySelector('.listings').classList.toggle('hidden')
}



// Validate all input
// Verify customer name regex
// to fix: align discount to the right of cell.
// filter functionality


/*
To throw error or just display message????
Or both???
*/