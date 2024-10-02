
const [specialsBtn, customBtn, viewCartBtn] = document.querySelectorAll('#specials, #custom, #viewCart')
const [specialsPage, customPage, summary] = document.querySelectorAll('.specials, .customize, .summary')



let active = specialsBtn
let currentPage = specialsPage
function toggleOrderPage(el, e) {
    active.classList.toggle('active')
    e.target.classList.toggle('active')
    currentPage.classList.toggle('active')
    el.classList.toggle('active')

    active = e.target
    currentPage = el
}



specialsBtn.addEventListener('click', (e) => toggleOrderPage(specialsPage, e))
customBtn.addEventListener('click', (e) => toggleOrderPage(customPage, e))
viewCartBtn.addEventListener('click', (e) => toggleOrderPage(summary, e))
