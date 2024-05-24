const express = require('express')
const cors = require('cors')
const rotaUsers = require('./rotas/users')
const rotaLogin = require('./rotas/login')

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/users', rotaUsers)
app.use('/login', rotaLogin)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})
