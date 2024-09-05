let balance = 1000

function checkBalance() {
    return balance
}

function deposit(amount) {
    if (amount < 1) {
        alert(`Amount cannot be less than 1!`)
    }
    return balance += amount
}

function withdraw(amount) {
    if (amount > balance) {
        alert(`Cannot withdraw more than balance`)
    } else if (amount < 1) {
        alert(`Amount cannot be less than 1!`)
    }
    return balance -= amount
}

function main(){
    while (true) {
        let request = prompt('What would you like to do?\nCheck balance\nWithdraw\nDeposit\nExit');
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