const { getTodosUsers, getUserPorId, postUserLogin, atualizaUserPorId, adicionaUser, removeUserPorId } = require("../servicos/users")

function getUsers(req, res) {
    try {
        const users = getTodosUsers()

        res.status(201)
        res.send(users)
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

function getUserId(req, res) {
    try {
        const id = parseInt(req.params.id)

        if (id && Number(id)) {
            const user = getUserPorId(id)

            res.status(201)
            res.send(user)
        } else {
            res.status(422)
            res.send('Id inválido')
        }
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

async function postUserEmail(req, res) {
    try {
        const userLogin = req.body
        let logado = await postUserLogin(userLogin.email, userLogin.senha)

        if (logado) {
            res.status(201)
            res.send('Login realizado com sucesso')
        } else {
            res.status(422)
            res.send('Usuário e senha inválido')
        }
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

function postUser(req, res) {
    try {
        const novoUser = req.body

        if (novoUser.usuario && novoUser.email && novoUser.senha) {
            adicionaUser(novoUser)
            res.status(201)
            res.send('Usuário adicionado com sucesso')
        } else {
            res.status(422)
            res.send('Usuário não adicionado')
        }
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function patchUser(req, res) {
    try {
        const id = parseInt(req.params.id)

        if (id && Number(id)) {
            const body = req.body

            atualizaUserPorId(id, body)
            res.status(201)
            res.send('Usuário atualizado com sucesso')
        } else {
            res.status(422)
            res.send('Id inválido')
        }
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id)

        if (id && Number(id)) {
            removeUserPorId(id)
            res.status(201)
            res.send('Usuário deletado com sucesso')
        } else {
            res.status(422)
            res.send('Id inválido')
        }
    } catch(error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getUsers,
    getUserId,
    postUserEmail,
    postUser,
    patchUser,
    deleteUser
}