/* 
Write JavaScript code that selects content id by using getElementById.
Write a function which will update the text content of the selected element to "Hello, World!" by clicking the button.
*/

const content = document.getElementById('content')

function changeText() {
    content.textContent = 'Hello, World!'
}