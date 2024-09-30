'use strict'
const displayPrice = document.querySelectorAll('#totalPrice')
let basePrice = 5
let toppingsPrice = 0;
let deliveryCost = 0;
let totalPancakeCount = 0;
let pancake = {pancakeBase: 'Classic', toppings: [], extras: []}
const allOrders = []
let ticket = []
let currentTimeout;

const reply = document.querySelector('#reply');

const placeOrderBtn = document.querySelector('#placeOrder')
const customerName = document.querySelector('#customerName')



//
//  Display message to the user function
//
function showMessage(msg) {
    reply.textContent = msg
    if (currentTimeout) {
        clearTimeout(currentTimeout)
    }
    return currentTimeout = setTimeout(() => reply.textContent = '', 4000)
}



//
//  Customizing the pancake
//  Event listeners and functions
const pancakeType = document.querySelector('#type')
const pancakeTypeOptions = document.querySelectorAll('#type option')

pancakeType.addEventListener('change', () => {
    basePrice = +pancakeType.value
    const pancakeId = Array.from(pancakeTypeOptions).find((a) => +a.value === basePrice)
    pancake.pancakeBase = pancakeId.id
    updatePrice()
})


const toppings = document.querySelectorAll('input[name="topping"]')
toppings.forEach((el) => {
    el.addEventListener('change', () => {
        el.checked ? addTopping(el, 'toppings') : removeTopping(el, 'toppings')
    })
})

const extras = document.querySelectorAll("input[name='extra']")
extras.forEach((el) => {
    el.addEventListener('change', () => {
        el.checked ? addTopping(el, 'extras') : removeTopping(el, 'extras')
    })
})

function addTopping(topping, category) {
    pancake[category].push(topping.id)
    toppingsPrice += +topping.value
    updatePrice()
}

function removeTopping(topping, category) {
    pancake[category].filter((a) => a !== topping.id)
    toppingsPrice -= +topping.value
    updatePrice()
}



const deliveryChoice = document.querySelector('#delivery') 
deliveryChoice.addEventListener('change', () => {
    deliveryChoice.checked ? deliveryCost = 5 : deliveryCost = 0;
})



//
//  Display how many items in the cart and current pancake price
//
function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${basePrice + toppingsPrice}`
        animate(element, 'bounce')
    }
}

function animate(el, animation) {
    el.classList.add(animation)
    setTimeout(() => el.classList.remove(animation), 500)
}


const cartCounter = document.querySelector('#orderCount')
function updateCart() {
    if (totalPancakeCount === 0) {
        cartCounter.classList.add('hidden')
    } else {
        cartCounter.classList.remove('hidden')
    }
    count.textContent = totalPancakeCount
    resetPancake()
}






const viewOrderBtn = document.querySelector('#viewOrder')
const summaryDetails = document.querySelectorAll('.summary p')
const orderDisplay = document.querySelector('.orderDisplay')

viewOrderBtn.addEventListener('click', () => {
    toggleSummary()
    displayOrder()
})




//
// Add to Cart
// Event listeners and functions
const count = document.querySelector('#orderCount')
const addToCartBtn = document.querySelector('#addToCart')

addToCartBtn.addEventListener('click', () => {
    totalPancakeCount++

    if (ticket.length === 0) {
        ticket.push({count: 1, pancake: pancake, cost: basePrice + toppingsPrice})
        resetPancake()
        return updateCart()
    }

    const cartNum = isInCart(pancake)

    if (cartNum !== -1) {
        ticket[cartNum].count++
        ticket[cartNum].cost += basePrice + toppingsPrice
        resetPancake()
        return updateCart()
    } else {
        ticket.push({count: 1, pancake: pancake, cost: basePrice + toppingsPrice})
        resetPancake()
        return updateCart()
    }


})

function isInCart(pancake) {
    return ticket.findIndex((item) => {
        return JSON.stringify(item.pancake) === JSON.stringify(pancake)})
}


function clearOrderDisplay() {
    orderDisplay.innerHTML = ''
}


function displayOrder() {
    if (ticket.length < 1) {
        orderDisplay.textContent = `Your cart is empty, try adding some delicious pancakes!`
    } else {
        ticket.forEach((item) => {  
            const container = document.createElement('div')
            const p = document.createElement('p')

            p.textContent = `${item.count}x ${item.pancake.pancakeBase} pancake, Toppings: ${item.pancake.toppings.length > 0 ? item.pancake.toppings.join(', ') : 'None'} Extras: ${item.pancake.extras.length > 0 ? item.pancake.extras.join(', ') : 'None'} Cost: $${item.cost}`

            const addBtn = document.createElement('button')
            addBtn.classList.add('orderAdd')
            addBtn.textContent = '+'
            const rmBtn = document.createElement('button')
            rmBtn.classList.add('orderRemove')
            rmBtn.textContent = '-'

            container.appendChild(p)
            container.appendChild(addBtn)
            container.appendChild(rmBtn)
            orderDisplay.appendChild(container)
        
            listenAddRemove()
        })
    }
}



//
// Incrementing and decrement pancake functionality
//
function addToOrder(index) {
    ticket[index].cost += ticket[index].cost / ticket[index].count
    ticket[index].count++
    totalPancakeCount++
    updateCart()
    clearOrderDisplay()
    summaryTotalCost()
    displayOrder()
}


function removeFromOrder(index) {
    if (ticket[index].count > 1) {
        ticket[index].cost -= ticket[index].cost / ticket[index].count
        ticket[index].count--
    } else {
        ticket = ticket.filter((a) => a.index === index)
    }
    totalPancakeCount--
    updateCart()    
    clearOrderDisplay()
    summaryTotalCost()
    displayOrder()
}

function listenAddRemove() {
    const orderAddBtn = document.querySelectorAll('.orderAdd')
    const orderRemoveBtn = document.querySelectorAll('.orderRemove')

    orderAddBtn.forEach((button, index) => {
        button.addEventListener('click', () => addToOrder(index))
    })

    orderRemoveBtn.forEach((button, index) => {
        button.addEventListener('click', () => removeFromOrder(index))
    })
}



//
// Toggle Summary/Customization Functionality
//
const returnBtn = document.querySelector('#return')
returnBtn.addEventListener('click', () => {
    toggleSummary()
    clearOrderDisplay()
})

function toggleSummary() {
    summaryTotalCost()
    document.querySelector('.summary').classList.toggle('hidden')
    document.querySelector('.customize').classList.toggle('hidden')
}




//
//  Display total cost of cart + any delivery fee
//
const totalCostDisplay = document.querySelector('#summaryTotalCost')
function summaryTotalCost() {
    let summaryCost = 0;

    if (ticket.length > 1) {
        summaryCost = ticket.reduce((a, b) => a + b.cost, 0)
    } else if (ticket.length === 1) {
        summaryCost = ticket[0].cost
    }
        
    totalCostDisplay.textContent = `$${summaryCost + deliveryCost}`
    addDelivery()
}


const deliveryDisplay = document.querySelector('#deliveryCost')
function addDelivery() {
    deliveryCost === 5 ? deliveryChoice.textContent = `, including a $5 delivery cost` : deliveryDisplay.textContent = ``
}




//
// Placing order functionality
//
placeOrderBtn.addEventListener('click', () => {
    try {
        validateName()

        if (ticket.length < 1) {
            throw new Error(`Cannot checkout empty cart`)
        }

        allOrders.push(JSON.stringify(ticket))
        showMessage(`Your order was successful! 🥳 Thank you for supporting our local business!`)
        resetPancake()
        resetTicket()
        clearOrderDisplay()
    } catch (error) {
        showMessage(`Error: ${error.message}`)
    }
})


//
//  Ensuring client name is not empty
//
function validateName() {
    let name = customerName.value.trim()
    if (name.length < 1) {
        throw new Error(`Sorry, name is not valid!`)
    }
}




//
//  Reset pancake and cart functionality
//
function resetTicket() {
    totalPancakeCount = 0;
    ticket = []
    return updateCart();
}


function resetPancake() {
    toppingsPrice = 0;
    basePrice = 5;
    pancakeType.value = 5;
    document.querySelectorAll('input[name="topping"], input[name="extra"]').forEach((topping) => {
        topping.checked = false
    })
    pancake = {pancakeBase: 'Classic', toppings: [], extras: []}

    updatePrice()
}



