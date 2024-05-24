const { Router } = require('express')
const { getUsers, getUserId, postUser, patchUser, deleteUser, postUserEmail } = require('../controladores/users')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUserId)

router.post('/', postUser)

router.patch('/:id', patchUser)

router.delete('/:id', deleteUser)

module.exports = router