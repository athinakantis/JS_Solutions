const serverReply = document.getElementById('serverReply')
const depositB = document.getElementById('deposit')
const withdrawB = document.getElementById('withdraw')
let confirm = document.getElementById('confirm')
let option = document.getElementById('option')
let amountB = document.getElementById('amount')

let balance = 1000.00
let request;

function checkBalance() {
    return balance
}

function deposit(amount) {
    if (amount < 1) {
        return `Deposits have to be of $1 or more`
    }
    balance += +amount.toFixed(2)
    return `Deposit successful!`
}

function withdraw(amount) {
    if (amount > balance) {
        return `Amount exceeds current balance`
    } else if (amount < 1) {
        return `Withdrawals have to be of $1 or more`
    }
    balance -= +amount.toFixed(2)
    return `Withdrawal successful!`
}




document.getElementById('checkbalance').addEventListener('click', () => {
    serverReply.innerHTML = `Your current balance is $${balance}`
})

depositB.addEventListener('click', () => {
    option.innerHTML = 'deposit'
})

withdrawB.addEventListener('click', () => {
    option.innerHTML = 'withdraw'
})


confirm.addEventListener('click', () => {
    if (option.innerHTML === 'deposit') {
        deposit(amountB.value)
    } else if (option.innerHTML === 'withdraw') {
        withdraw(amountB.value)
    }
})