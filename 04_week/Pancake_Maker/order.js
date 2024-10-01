
const specialsBtn = document.querySelector('#specials')
const customBtn = document.querySelector('#custom')
const specialsPage = document.querySelector('.specials')
const customPage = document.querySelector('.customize')
const summary = document.querySelector('.summary')

let currentPage = specialsPage
function toggleOrderPage(el) {
    currentPage.classList.toggle('hidden')
    el.classList.toggle('hidden')

    currentPage = el
}

specialsBtn.addEventListener('click', () => toggleOrderPage(specialsPage))
customBtn.addEventListener('click', () => toggleOrderPage(customPage))



