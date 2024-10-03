"use strict";

/* Site Navigation functionality & Event Listeners */
const [specialsBtn, customBtn, viewCartBtn] = document.querySelectorAll('#specials, #custom, #viewCart');
const [specialsPage, customPage, summary] = document.querySelectorAll('.specials, .customize, .summary');
const [homeBtn, redirectOrderBtn, redirectAboutBtn] = document.querySelectorAll('#homeBtn, #redirectOrderBtn, #redirectAboutBtn');
const [home, order] = document.querySelectorAll('.home, .order');

let active = specialsBtn
let currentPage = home;
let currentOrderPage = specialsPage

function toggleOrderPage(el, e) {
    active.classList.toggle('active');
    e.target.classList.toggle('active');
    currentOrderPage.classList.toggle('active');
    el.classList.toggle('active');

    active = e.target;
    currentOrderPage = el;
}


specialsBtn.addEventListener('click', (e) => toggleOrderPage(specialsPage, e));
customBtn.addEventListener('click', (e) => toggleOrderPage(customPage, e));
viewCartBtn.addEventListener('click', (e) => toggleOrderPage(summary, e));


homeBtn.addEventListener('click', (e) => togglePage(home));
redirectOrderBtn.addEventListener('click', (e) => togglePage(order));
redirectAboutBtn.addEventListener('click', () => console.log('hello'));


function togglePage(el) {
    currentPage.classList.toggle('active');
    el.classList.toggle('active');
    currentPage = el;
}




let totalPancakeCount = 0;
const orderList = []
const cart = [];
const pancake = {pancakeBase: 'Classic', toppings: [], extras: []};
let [basePrice, toppingsPrice, deliveryCost] = [5, 0, 0];
let currentTimeout;

const displayPrice = document.querySelectorAll('#totalPrice')
const reply = document.querySelector('#reply')






function addToCart() {
    totalPancakeCount++
    let cartNum = isInCart(pancake)

    if (cart.length < 1 || cartNum === -1) {
        cart.push({count: 1, pancake: pancake, cost: basePrice + toppingsPrice})
    } else {
        cart[cartNum].count++
        cart[cartNum].cost += basePrice + toppingsPrice
    }
    resetPancake()
    updateCart()
}

const isInCart = (pancake) => {
    return cart.findIndex((item) => JSON.stringify(item.pancake) === JSON-stringify(pancake))
}



function displayOrder() {
    if (cart.length < 1) {
        orderDisplay.textContent = `Your cart is empty, try adding some delicious pancakes! :)`
    } else {
        cart.forEach((item) => {
            let [toppings, extras] = [item.pancake.toppings, item.pancake.extras]
            orderDisplay.innerHTML += `<div class='orderItem'>${item.count}x ${item.pancake.pancakeBase} pancake, Toppings: ${toppings.length > 0 ? toppings.join(', ') : 'None'}, 
            Extras: ${extras.length > 0 ? extras.join(', ') : 'None'}
            </div>
            <div>
            <button class='orderAdd'>+</button>
            <button class='orderRm'>-</button>
            </div>
            `
        })
        listenAddRemove()
    }
}


function removeFromCart(index) {
    totalPancakeCount--
    if (cart[index].count > 1) {
        cart[index].cost -= cart[index].cost / ticket[index].count
    } else {
        cart.slice(index, 1)
    }
    orderDisplay.innerHTML = ''
    updateCart()
    summaryTotalCost()
    displayOrder()
}


const [orderAddBtn, orderRmBtn] = document.querySelectorAll('.orderAdd, .orderRm')
function listenAddRemove() {
    const orderAddBtn = document.querySelectorAll('.orderAdd')
    const orderRemoveBtn = document.querySelectorAll('.orderRemove')

    orderAddBtn.forEach((button) => {
        button.addEventListener('click', () => addToOrder())
    })

    orderRemoveBtn.forEach((button, index) => {
        button.addEventListener('click', () => removeFromOrder(index))
    })
}

const totalCostDisplay = document.querySelector('#summaryTotalCost')
function summaryTotalCost() {
    let summaryCost = ticket.reduce((a, b) => a + b.cost, 0)
        
    totalCostDisplay.textContent = `$${summaryCost + deliveryCost}`
    if (deliveryCost === 5) {
        totalCostDisplay.textContent += `, including a $5 delivery fee`   
    }
}


const placeOrderBtn = document.querySelector('#placeOrder')
placeOrderBtn.addEventListener('click', placeOrder)

function placeOrder() {
    try {
        const name = document.querySelector('#orderName').trim()
        
        if (!name || name.length < 1) {
            throw new Error(`Order is missing name input`)
        } 

        orderList.push(cart);
        showMessage(`Your order was completed! Thank you for supporting our local business 🫶`)
        resetTicket()
    } catch (error) {
        showMessage(`Error:`, error.message)
    }
}

function resetTicket() {
    for (let item of cart) {
        cart.slice(-1, 1)
    }
    console.log(`cart should be empty :) .. `, cart)
}

function resetPancake() {
    [basePrice, toppingsPrice, deliveryCost] = [5, 0, 0]
    pancakeType.value = 5;
    document.querySelectorAll('input[name="topping"], input[name="extra"]').forEach((topping) => {
        topping.checked = false
    })
    pancake.pancakeBase = 'Classic'
    pancake.toppings = []
    pancake.extras = []
    updatePrice()
}


function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${basePrice + toppingsPrice}`
        animate(element, 'bounce')
    }
}

function animate(el, animation) {
    el.classList.add(animation)
    setTimeout(() => el.classList.remove(animation), 400)
}

const cartCounter = document.querySelector('#orderCount')
function updateCart() {
    totalPancakeCount > 0 ? cartCounter.remove('hidden') : cartCounter.add('hidden');
    cartCounter.textContent = totalPancakeCount
}



/* Pancake Customization Event Listeners and Functions */
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

function showMessage(msg) {
    reply.textContent = msg
    if (currentTimeout) {clearTimeout(currentTimeout)}
    currentTimeout = setTimeout(() => reply.textContent = '', 4000)
}