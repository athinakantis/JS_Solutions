
let displayPrice = document.querySelectorAll('#totalPrice')
let basePrice = +document.querySelector('#type').value
let toppingsPrice = 0;
let deliveryCost = 0;
let pancake = {pancakeBase: 'Classic', toppings: [], extras: []}


document.addEventListener('change', (e) => {
    if (e.target.id === 'type') {
        basePrice = +e.target.value
        pancake.pancakeBase = e.target.selectedOptions[0].textContent.match(/[a-z]/gi).join('')
    } else if (e.target.name === 'topping') {
        if (e.target.checked) {
            toppingsPrice ++
            pancake.extras.push(e.target.id)
        } else {
            toppingsPrice--
            pancake.extras.filter((a) => a !== e.target.id)
        }
    } else if (e.target.name === 'extra') {
        if (e.target.checked) {
            toppingsPrice++
            pancake.extras.push(e.target.id)
        } else {
            toppingsPrice--
            pancake.extras.filter((a) => a !== e.target.id)
        }
        e.target.checked ? toppingsPrice += +e.target.value : toppingsPrice -= +e.target.value
    } else if (e.target.name === 'delivery') {
        e.target.id === 'delivery' ? deliveryCost = 5 : deliveryCost = 0
    }
    updatePrice()
})




function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${basePrice + toppingsPrice + deliveryCost}`
        element.classList.add('bounce')
        setTimeout(() => element.classList.remove('bounce'), 500)
    }
}

let button = document.querySelector('button')
let orderDetails = document.querySelectorAll('.summary p')




button.addEventListener('click', () => {

    //Displaying customer name
    orderDetails[0].textContent = `Name: ${document.querySelector('#customerName').value}`

    

    for (let extra of pancake.extras) {
        extra = extra.split('C')
        extra[0][0] = extra[0][0].toUpperCase()
        extra = extra.join(' C')
        console.log(extra)
    }
    //Displaying pancake details
    orderDetails[1].textContent = `Your order: ${pancake.pancakeBase} pancake, Toppings: ${pancake.toppings}, Extras: ${pancake.extras}`
 

    //Displaying delivery cost
    if (deliveryCost === 5) {
        orderDetails[3].textContent = `Delivery fee: `
    }
})