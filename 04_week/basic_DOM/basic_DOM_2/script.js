/* 
Write JavaScript code that adds an event listener to the button.

When the button is clicked, the function should:
- Retrieve the value from the input field.
- Create a new <li> element and set its text content to the input field's value.
- Append the new <li> element to the fruitList <ul>.

Ensure the input field is cleared after adding the fruit to the list.

*/
const fruitList = document.getElementById('fruitList')
const input = document.getElementById('fruitInput')
const button = document.getElementById('addFruitBtn')

function addFruit() {
    if (!input.value) {
        alert('Please give the fruit a name!! :(')
    } else {
        let newFruit = document.createElement('li') 
        newFruit.textContent = `${input.value}`
        fruitList.appendChild(newFruit)
        input.value = null
    }
}


button.addEventListener('click', () => addFruit())

