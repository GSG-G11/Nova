import { login } from '../controllers'
import express from 'express'

const router: any = express.Router()

router.post('/login', login)

export default router