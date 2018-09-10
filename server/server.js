const express = require('express')

const app = express()

app.get('/',(req, res) => {
    res.send('Express app working fine')
})

app.listen(3000, () => {
    console.log(`Express app listening at 3000`)
})