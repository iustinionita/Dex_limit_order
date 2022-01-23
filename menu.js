module.exports = [
    {
        type: 'checkbox',
        name: 'Do you want to BUY or SELL a token?',
        choices: [
            {
                name: 'Buy'
            },
            {
                name: 'Sell'
            }
        ]
    },
    {
        type: 'input',
        name: 'targetPrice',
        message: 'Your target price: '
    },
    {
        type: 'input',
        name: 'address',
        message: 'Contract address: '
    },
    {
        type: 'input',
        name: 'amount',
        message: 'How much would you like to spend?'
    }
]