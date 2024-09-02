let balance = 1000

function checkBalance() {
    return balance
}

function deposit(amount) {
    balance += amount
    return balance
}

function withdraw(amount) {
    balance -= amount
    return balance
}

function main(){
    while (true) {
        let request = prompt('What would you like to do?');
        request = request.toLowerCase()
        console.log(request)
    
        if (request === 'exit') { break;}
        else if (request.startsWith('c')) {
            alert(checkBalance())
        } else if (request.startsWith('d')) {
            let amount = +prompt('How much would you like to deposit?')
            deposit(amount)
            alert(`You have deposited ${amount}!`)
        } else if (request.startsWith('w')) {
            let amount = +prompt('How much would you like to withdraw?')
            withdraw(amount)
            alert(`You have withdrawn ${amount}!`)

        }
    }
}