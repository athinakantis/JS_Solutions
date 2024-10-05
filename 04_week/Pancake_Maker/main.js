"use strict";

//Initial values for cart and pancake.
let totalPancakeCount = 0;
const orderList = [];
let cart = [];
let customPancake = {pancakeBase: 'Classic', toppings: [], extras: [], special: false};
let [basePrice, toppingsPrice, deliveryCost] = [5, 0, 0];
let currentTimeout;

const specials = [{pancake: 'Cherry Bomb', cost: 12, special: true}, {pancake: 'Pumpkin Spice Cinnamon Roll', cost: 11, special: true}, {pancake: 'Banana Swirl', cost: 10, special: true}]



class Pancake {
    constructor(count, pancake, special, cost) {
        this.count = +count
        this.pancake = pancake
        this.special = special
        this.cost = +cost
    }
    
    getTotalCost() {
        return this.price * this.count;
    }

    addPancake() {
        return this.count++
    }

    removePancake() {
        return this.count--
    }
}


/* 
PANCAKE CUSTOMIZATION
Functions, variables and event listeners */
const pancakeType = document.querySelector('#type');
const pancakeTypeOptions = document.querySelectorAll('#type option');
const toppings = document.querySelectorAll('input[name="topping"]');
const extras = document.querySelectorAll("input[name='extra']");
const reply = document.querySelector('#reply');
const cartCounter = document.querySelector('#cartCount');



pancakeType.addEventListener('change', () => {
    basePrice = +pancakeType.value;
    const pancakeId = Array.from(pancakeTypeOptions).find((a) => +a.value === basePrice);
    customPancake.pancakeBase = pancakeId.id;
    console.log(customPancake.pancakeBase)
    return updatePrice()
})


toppings.forEach((el) => {
    el.addEventListener('change', () => {
        el.checked ? addTopping(el, 'toppings') : removeTopping(el, 'toppings')
    })
})

extras.forEach((el) => {
    el.addEventListener('change', () => {
        el.checked ? addTopping(el, 'extras') : removeTopping(el, 'extras')
    })
})

function addTopping(topping, category) {
    customPancake[category].push(topping.id)
    toppingsPrice += +topping.value
    console.log(customPancake.toppings)

    updatePrice()
}

function removeTopping(topping, category) {
    customPancake[category].filter((a) => a !== topping.id)
    toppingsPrice -= +topping.value
    console.log(customPancake.toppings)
    updatePrice()
}

const deliveryChoice = document.querySelector('#delivery') 
deliveryChoice.addEventListener('change', () => {
    deliveryChoice.checked ? deliveryCost = 5 : deliveryCost = 0;
    console.log(deliveryChoice)

    summaryTotalCost()
})



function resetTicket() {
    for (let item of cart) {
        cart.slice(-1, 1)
    }
    console.log(`cart should be empty :) .. `, cart)
}




const displayPrice = document.querySelectorAll('#totalPrice')
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


function showMessage(msg) {
    reply.textContent = msg
    if (currentTimeout) {clearTimeout(currentTimeout)}
    currentTimeout = setTimeout(() => reply.textContent = '', 4000)
}




/* Site Navigation functionality & Event Listeners */
const [specialsBtn, customBtn, viewCartBtn] = document.querySelectorAll('#specials, #custom, #viewCart');
const [specialsPage, customPage, summary] = document.querySelectorAll('.specials, .customize, .summary');
const [homeBtn, redirectOrderBtn, redirectAboutBtn] = document.querySelectorAll('#homeBtn, #redirectOrderBtn, #redirectAboutBtn');
const [home, order, confirmation] = document.querySelectorAll('.home, .order, .confirmation');

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
viewCartBtn.addEventListener('click', (e) => {
    viewCart()
    toggleOrderPage(summary, e)
});


homeBtn.addEventListener('click', (e) => togglePage(home));
redirectOrderBtn.addEventListener('click', (e) => togglePage(order));
redirectAboutBtn.addEventListener('click', () => console.log('hello'));


function togglePage(el) {
    currentPage.classList.toggle('active');
    el.classList.toggle('active');
    currentPage = el;
}


function viewCart() {
    summaryTotalCost();
    displayOrder();
}






/*
ADDING PANCAKES: Specials & Customs
Functions, variables and event listeners  */
const addCustomBtn = document.querySelector('#addCustom')
const addSpecialsBtn = document.querySelectorAll('.addSpecial')
addCustomBtn.addEventListener('click', () => {
    console.log(customPancake)
    addToCart(customPancake)
})
addSpecialsBtn.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(specials[index], true))
})


//Current 'specials' :)


//Check if pancake is already in cart
function isInCart(pancake) {
    cart.forEach((item) => console.log(item))
    return cart.findIndex((item) => JSON.stringify(item.pancake) === JSON.stringify(pancake))
}

//If pancake is already in cart, add to it. Else, push new pancake.
function addToCart(pancake, special = false) {
    let cartNum = isInCart(pancake)
    console.log(cartNum)
    let cost;

    special ? cost = pancake.cost : cost = basePrice + toppingsPrice;

    if (cart.length < 1 || cartNum === -1) {
        cart.push({count: 1, pancake: pancake, cost: cost, special: special})
    } else if (cartNum !== -1) {
        cart[cartNum].cost += cost
        cart[cartNum].count++
    }
    totalPancakeCount++
    displayOrder()
    updateCartCount()
    resetPancake()
}



/*
ORDER SUMMARY
Functions, variables and event listeners*/
const orderDisplay = document.querySelector('.orderDisplay');
const [orderAddBtn, orderRmBtn] = document.querySelectorAll('.orderAdd, .orderRm');
function displayOrder() {
    orderDisplay.innerHTML = ''
    if (cart.length < 1) {
        orderDisplay.textContent = `Your cart is empty, try adding some delicious pancakes! :)`
    } else {
        cart.forEach((item) => {
            let typeOfPancake;
            if (item.special) {
                typeOfPancake = `${item.pancake.pancake}`;
            } else {
                let [base, toppings, extras] = [item.pancake.pancakeBase, item.pancake.toppings, item.pancake.extras]
                typeOfPancake = `${base} pancake, Toppings: ${toppings.length > 0 ? toppings.join(', ') : 'None'}, Extras: ${extras.length > 0 ? extras.join(', ') : 'None'}`
            }

            orderDisplay.innerHTML += `
            <div class='orderItem'>
            ${item.count}x ${typeOfPancake}
            <div>
            <button class='orderAdd'>+</button>
            <button class='orderRm'>-</button>
            </div>
            </div>
            `
        })
        listenAddRemove()
        summaryTotalCost()
    }
}


//Removing from cart. Decrementing if more than 1 pancake, removing entirely if only one.
function removeFromCart(index) {
    totalPancakeCount--
    if (cart[index].count > 1) {
        cart[index].cost -= cart[index].cost / cart[index].count
        cart[index].count--
    } else {
        cart.splice(index, 1)
    }
    orderDisplay.innerHTML = ''
    updateCartCount()
    summaryTotalCost()
    displayOrder()
}

//Attaching event listeners to summary buttons, in case user wants to add or remove from their cart
function listenAddRemove() {
    const orderAddBtn = document.querySelectorAll('.orderAdd')
    const orderRemoveBtn = document.querySelectorAll('.orderRm')

    orderAddBtn.forEach((button, index) => {
        let pancake = cart[index].pancake
        button.addEventListener('click', () => addToCart(pancake, pancake.special))
    })

    orderRemoveBtn.forEach((button, index) => {
        button.addEventListener('click', () => removeFromCart(index))
    })
}


//Displaying the total cost of all items in the cart
const totalCostDisplay = document.querySelector('#summaryTotalCost')
function summaryTotalCost() {
    let summaryCost = cart.reduce((a, b) => a + b.cost, 0)
        
    totalCostDisplay.textContent = `Total Cost: $${summaryCost + deliveryCost}`
    if (deliveryCost === 5) {
        totalCostDisplay.textContent += `, including a $5 delivery fee`   
    }
}


//Placing the order if customer has entered a name
const placeOrderBtn = document.querySelector('#placeOrder')
placeOrderBtn.addEventListener('click', placeOrder)

function placeOrder() {
    try {
        const name = document.querySelector('#orderName').trim()
        
        if (!name || name.length < 1) {
            throw new Error(`Order is missing a name`)
        } 

        orderList.push(cart);
        resetTicket()

    } catch (error) {
        showMessage(`Error:`, error.message)
    }
}

//Updating cart 'preview' to display how many total pancakes the user has in cart
function updateCartCount() {
    cartCounter.textContent = totalPancakeCount
    totalPancakeCount > 0 ? cartCounter.classList.add('active') : cartCounter.classList.remove('active');
}





function resetPancake() {
    [basePrice, toppingsPrice, deliveryCost] = [5, 0, 0]
    pancakeType.value = 5;
    document.querySelectorAll('input[name="topping"], input[name="extra"]').forEach((topping) => {
        topping.checked = false
    })
    
    customPancake.pancakeBase = 'Classic'
    customPancake.toppings = []
    customPancake.extras = []
    updatePrice()
}