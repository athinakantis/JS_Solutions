
const displayPrice = document.querySelectorAll('#totalPrice')
let basePrice = +document.querySelector('#type').value
let toppingsPrice = 0;
let deliveryCost = 0;
let totalPancakeCount = 0;
let pancake = {pancakeBase: 'Classic', toppings: [], extras: []}
const allOrders = []
let ticket = []

const reply = document.querySelector('.reply')





/* Listening for changes in customization */
document.addEventListener('change', (e) => {
    if (e.target.id === 'type') {
        basePrice = +e.target.value
        pancake.pancakeBase = e.target.selectedOptions[0].textContent.match(/[a-z]/gi).join('')
    } else if (e.target.name === 'topping') {
        if (e.target.checked) {
            toppingsPrice++
            pancake.toppings.push(e.target.id)
        } else {
            toppingsPrice--
            pancake.toppings.filter((a) => a !== e.target.id)
        }
    } else if (e.target.name === 'extra') {
        if (e.target.checked) {
            toppingsPrice += +e.target.value
            pancake.extras.push(e.target.id)
        } else {
            toppingsPrice -= e.target.value
            pancake.extras.filter((a) => a !== e.target.id)
        }
    } else if (e.target.name === 'delivery') {
        e.target.id === 'delivery' ? deliveryCost = 5 : deliveryCost = 0
    }
    updatePrice()
})




/* Update Price */
function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${basePrice + toppingsPrice}`
        element.classList.add('bounce')
        setTimeout(() => element.classList.remove('bounce'), 500)
    }
}

function updateCart() {
    console.log(ticket)
    document.querySelector('.orderCount').classList.remove('hidden')
    count.textContent = totalPancakeCount
    resetPancake()
}



//Show order
const viewOrderBtn = document.querySelector('#viewOrder')
const summaryDetails = document.querySelectorAll('.summary p')
const orderDisplay = document.querySelector('.orderDisplay')

viewOrderBtn.addEventListener('click', () => {
    toggleSummary()
    displayOrder()
})




//Add to cart event listener and functionality
const count = document.querySelector('#orderCount')
document.querySelector('#addToCart').addEventListener('click', () => {
    totalPancakeCount++

    if (ticket.length === 0) {
        ticket.push({count: 1, pancake: pancake, cost: basePrice + toppingsPrice})
        resetPancake()
        return updateCart()
    }

    const pancakeIndex = ticket.findIndex((item) => {
        return JSON.stringify(item.pancake) === JSON.stringify(pancake)
    })

    if (pancakeIndex !== -1) {
        ticket[pancakeIndex].count++
        ticket[pancakeIndex].cost += basePrice + toppingsPrice
        resetPancake()
        return updateCart()
    } else {
        ticket.push({count: 1, pancake: pancake, cost: basePrice + toppingsPrice})
        resetPancake()
        return updateCart()
    }
})

function clearOrderDisplay() {
    orderDisplay.innerHTML = ''
}


function displayOrder() {
    if (ticket.length < 1) {
        orderDisplay.textContent = `Your cart is empty, try adding some delicious pancakes!`
    } else {
        ticket.forEach((item) => {  
            let html = `<div>
                        <p>${item.count}x ${item.pancake.pancakeBase} pancake, Toppings: ${item.pancake.toppings.length > 0 ? item.pancake.toppings.join(', ') : 'None'} Extras: ${item.pancake.extras.length > 0 ? item.pancake.extras.join(', ') : 'None'} Cost: $${item.cost}</p>
                        <div>
                        <button class="orderAdd">+</button>
                        <button class="orderRemove">-</button>
                        </div>
                        </div>`
            orderDisplay.innerHTML += html
            listenAddRemove()
        })
    }
}


/* Add more/Remove from cart functionality */
function listenAddRemove() {
    document.querySelectorAll('.orderAdd').forEach((button, index) => {
        button.addEventListener('click', () => {
            ticket[index].cost += ticket[index].cost / ticket[index].count
            ticket[index].count++
            totalPancakeCount++
            updateCart()
            clearOrderDisplay()
            displayOrder()
        })
    })

    document.querySelectorAll('.orderRemove').forEach((button, index) => {
        button.addEventListener('click', () => {
            if (ticket[index].count > 1) {
                ticket[index].cost -= ticket[index].cost / ticket[index].count
                ticket[index].count--
            } else {
                ticket = ticket.filter((a) => a !== a[index])
            }
            totalPancakeCount--
            updateCart()
            clearOrderDisplay()
            displayOrder()
        })
    })
}




//Return to pancake customization
const returnBtn = document.querySelector('#return')
returnBtn.addEventListener('click', () => {
    toggleSummary()
    orderDisplay.innerHTML = ''
})

function toggleSummary() {
    document.querySelector('.summary').classList.toggle('hidden')
    document.querySelector('.customize').classList.toggle('hidden')
}

//Placing order functionality
const placeOrderBtn = document.querySelector('#placeOrder')
placeOrderBtn.addEventListener('click', () => {
    let customerName = document.querySelector('#customerName').value


    //Customer has to enter a name for their order
    if (!customerName) {
        reply.children[1].textContent = ''
        reply.firstChild.textContent = 'Please enter a name for your order!'
        reply.classList.toggle('hidden')
        return setTimeout(() => reply.classList.toggle('hidden'), 2500)
    } else {
        allOrders.push(ticket)

        //Update 'reply' message on success
        reply.firstChild.textContent = `Your order was successful! 🥳`
        reply.children[1].textContent = `Thank you for supporting our local business!`
        reply.classList.toggle('hidden')

        //Removing current pancake/customer info
        resetPancake()
    }
    
    setTimeout(() => {
        updatePrice()
        reply.classList.toggle('hidden')
        toggleSummary()
    }, 3000)
})


function resetPancake() {
    toppingsPrice = 0;
    basePrice = 5;
    document.querySelector('#type').value = 5;
    document.querySelectorAll('input[name="topping"], input[name="extra"]').forEach((topping) => {
        topping.checked = false
    })
    pancake = {pancakeBase: 'Classic', toppings: [], extras: []}
    updatePrice()
}







