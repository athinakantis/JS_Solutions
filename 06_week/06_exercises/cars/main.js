
const licensePlateRegex = new RegExp(/^[A-Za-z]{3}\d{3}$/);
const thisYear = new Date().getFullYear();


const newName = document.querySelector('#customerName');
const newLicense = document.querySelector('#licensePlate');
const newMaker = document.querySelector('#maker');
const newModel = document.querySelector('#model');
const newColor = document.querySelector('#color');
const newYear = document.querySelector('#year');
const newPrice = document.querySelector('#price');

const searchReply = document.querySelector('#searchReply');
const newListingsReply = document.querySelector('#newListingsReply');

const tableBody = document.querySelector('#listingsTable tbody');

let currentTimeout;

//Makes sure the max attribute of year input is set to the current year
newYear.setAttribute('max', thisYear);




// Car class
// And cars array
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
        const discountRate = 0.15;
        return this.price * (1 - discountRate);
    }

}

//Example Cars
const cars = [];
cars.push(new Car('ABC123', 'Toyota', 'Corolla', 'John Doe', 2024, 'Midnight Blue', 5000));
cars.push(new Car('ZZZ999', 'Hyundai', 'IONIC 6', 'Jane Doe', 2000, 'Red', 4000));


initiateListings(cars);




newLicense.addEventListener('input', () => {
    if (newLicense.validity.patternMismatch) {
        newLicense.setCustomValidity('Please enter a license plate in the following format: ABC123');
    } else {
        newLicense.setCustomValidity('');
    }
})


newColor.addEventListener('input', () => {
    if (newColor.validity.patternMismatch) {
        newColor.setCustomValidity('Color name shouldn`t include any digits or special characters')
    } else {
        newColor.setCustomValidity('')
    }
})


function validateLicense() {
    const license = newLicense.value.toUpperCase();

    if (cars.find((car) => car.licensePlate === license)) {
        throw new Error(`A car with this license plate already exists in our system. Make sure you've entered the correct license.`);
    } else if (!licensePlateRegex.test(license)) {
        throw new Error('Please enter a license plate in the following format: ABC123')
    }
    return license;
}

function validateName() {
    let customerName = newName.value;
    customerName = customerName.trim()
    if (customerName.length < 1) {
        throw new Error('Invalid name, please try again')
    }
    return customerName
}


function validateMaker() {
    if (newMaker.value === 'Default') {
        throw new Error('Please pick a maker');
    }
}

function validateModel() {
    if (newModel.value === 'Default') {
        throw new Error('Please pick a model');
    }
}

function showMessage(replyField, message, error = false) {
    if (error) {
        toggleError(replyField)
    } else {
        replyField.classList.remove('errorReply')
        replyField.classList.add('successReply');
    }

    replyField.textContent = message;
    
    setTimeout(() => replyField.textContent = '', 5000)
}

function toggleError(replyField) {
    replyField.classList.remove('successReply')
    replyField.classList.add('errorReply')
}



function initiateListings(arr) {
    arr.forEach((car) => updateListings(car));
}





//
// Show only models of the chosen maker
//
let modelFilter;
const optgroups = document.querySelectorAll('optgroup')
newMaker.addEventListener('change', (e) => {
    e.preventDefault();
    const modeldropdown = Array.from(optgroups);
    if (modelFilter) {
        modelFilter.classList.toggle('hidden');
    }
    modelFilter = modeldropdown.find((category) => category.label === newMaker.value);
    modelFilter.classList.toggle('hidden');
})


//
// Listen for any new listings
//
const newListingForm = document.querySelector('#newListing');
newListingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
        validateMaker();
        validateModel();
        const customerName = validateName();
        const license = validateLicense();
        
        const newCar = new Car(license, newMaker.value, newModel.value, customerName, newYear.value, newColor.value, newPrice.value);
        
        cars.push(newCar);
        updateListings(newCar, true);
        resetListingsForm();
    
        showMessage(newListingsReply, `Your new listing has been created!`);
    } catch (error) {
        showMessage(newListingsReply, `Error: ${error.message}`, true, true);
    }
})





function resetListingsForm() {
    newName.value = '';
    newLicense.value = '';
    newMaker.value = 'Default';
    newModel.value = 'Default';
    newColor.value = '';
    newYear.value = '';
    newPrice.value = '';
}



function updateListings(car, highlight = false) {
    const tr = tableBody.insertRow(-1);
    const discountTd = hasDiscount(car)
    const priceTd = document.createElement('td')
    priceTd.textContent = `$${car.price}`

    if (highlight) {
        tr.classList.add('highlight')
    }

    for (let i = 0; i < Object.values(car).length - 1; i++){
        let td = document.createElement('td')
        td.textContent = Object.values(car)[i]
        tr.appendChild(td)
    }
    
    tr.appendChild(priceTd);
    tr.appendChild(discountTd);
    tableBody.appendChild(tr);
}



function hasDiscount(car) {
    const discountTd = document.createElement('td');
    const div = document.createElement('div');

    if (thisYear - car.year > 10) {
        const price = car.discountPrice();
        div.textContent = `$${price}`;
        discountTd.classList.add('hasDiscount');
        discountTd.appendChild(div)
    } else {
        discountTd.textContent = '---';
    }
    return discountTd;
}









//
//  Search functionality.
//  Filter by discounted cars or search license plates
//
const searchbar = document.querySelector('#searchbar');
const filterLicense = document.querySelector('#filterLicense');
const filterDiscount = document.querySelector('#filterDiscount');



const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchValue = searchbar.value;

    if (filterLicense.checked) {
        searchLicensePlate(searchValue);
    } 


})


searchbar.addEventListener('input', () => {
    if (searchbar.validity.patternMismatch) {
        searchbar.setCustomValidity('Please enter a license plate in the following format: ABC123');
    } else {
        searchbar.setCustomValidity('');
    }
})


filterLicense.addEventListener('change', () => {
    if (filterLicense.checked) {
        searchbar.setAttribute('pattern', '^[A-Za-z]{3}\d{3}$');
    } else {
        searchbar.removeAttribute('pattern');
    }
})


function searchLicensePlate(searchValue) {
    const car = cars.find((car) => car.licensePlate === searchValue.toUpperCase());

    if (car) {
        searchReply.textContent = 'Car found:'
        tableBody.innerHTML = '';
        return updateListings(car, true);
    } else {
        return showMessage(searchReply, `No car with license plate ${searchValue.toUpperCase()} found. Check spelling and try again`);
    }
}


filterDiscount.addEventListener('change', () => {
    filterDiscount.checked ? searchDiscounts() : resetTable(cars);
})


function searchDiscounts() {
    const filteredCars = cars.filter((car) => thisYear - car.year > 10);
    resetTable(filteredCars)
}


function resetTable(arr) {
    searchReply.textContent = ''
    tableBody.innerHTML = '';
    initiateListings(arr);
}



//
// Toggle between Search listings and All listings
//
document.querySelector('#searchIcon').addEventListener('click', toggleSearch);
document.querySelector('#returnIcon').addEventListener('click', toggleSearch);


function toggleSearch() {
    document.querySelector('.listings-header').classList.toggle('hidden');
    document.querySelector('.searchContainer').classList.toggle('hidden');

    resetTable(cars)
}





