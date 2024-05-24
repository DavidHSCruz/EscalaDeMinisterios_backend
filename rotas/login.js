const { Router } = require('express')
const { getUsers, getUserId, postUserEmail } = require('../controladores/users')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUserId)

router.post('/', postUserEmail)

module.exports = router