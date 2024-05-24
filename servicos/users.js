const fs = require('fs')
const bcrypt = require('bcrypt')

function getTodosUsers() {
    const users = JSON.parse(fs.readFileSync('users.json'))

    return users
}

function getUserPorId(id) {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const user = users.filter(user => user.id === id)

    return user
}

async function postUserLogin(email, senha) {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const user = users.filter(user => user.email === email)

    const match = await bcrypt.compare(senha, user[0].senha)
    
    return match
}

function adicionaUser(novoUser) {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const ultimoUser = users[users.length - 1]

    const id = ultimoUser.id + 1

    bcrypt.hash(novoUser.senha, 10, (erro, hash) => {

        if (erro) {
            console.error(erro);
        } else {
            novoUser.senha = hash
            novoUser = { id, ...novoUser }
            const usersAtualizados = [...users, novoUser]
        
            fs.writeFileSync('users.json', JSON.stringify(usersAtualizados))
        }
    })
}

function atualizaUserPorId(id, atualizacao) {
    let users = JSON.parse(fs.readFileSync('users.json'))
    const user = users.findIndex(user => user.id === id)

    bcrypt.hash(users[user].senha, 10, (erro, hash) => {

        if (erro) {
            console.error(erro);
        } else {
            const userAtualizado = { ...users[user], ...atualizacao }
            users[user] = userAtualizado
            users[user].senha = hash
    
            fs.writeFileSync('users.json', JSON.stringify(users))
        }
    })
}

function removeUserPorId(id) {
    let users = JSON.parse(fs.readFileSync('users.json'))
    const usersFiltrados = users.filter(user => user.id !== id)

    fs.writeFileSync('users.json', JSON.stringify(usersFiltrados))
}

module.exports = {
    getTodosUsers,
    getUserPorId,
    postUserLogin,
    adicionaUser,
    atualizaUserPorId,
    removeUserPorId
}