
let pancakeSelect = document.querySelector('#type')
let toppings = document.querySelectorAll('#nuts, #bananas, #syrup')
let extras = document.querySelectorAll('#whippedCream, #iceCream')
let displayPrice = document.querySelectorAll('#totalPrice')
let totalPrice = +pancakeSelect.value



pancakeSelect.addEventListener('change', () => {
    totalPrice = +pancakeSelect.value
    updatePrice()
})



for (let topping of toppings) {
    topping.addEventListener('change', () => {
        topping.checked ? totalPrice++ : totalPrice--
        updatePrice()
    })
}

for (let extra of extras) {
    extra.addEventListener('change', () => {
        if (extra.checked) {
            totalPrice += +extra.value
            updatePrice()
        } else {
            totalPrice -= +extra.value
            updatePrice()
        }
    })
}



function updatePrice() {
    for (let element of displayPrice) {
        element.textContent = `$${totalPrice}`
        element.classList.add('bounce')
        setTimeout(() => element.classList.remove('bounce'), 500)
    }
}

