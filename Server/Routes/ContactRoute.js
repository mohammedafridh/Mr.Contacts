import express from 'express'
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from '../Controllers/ContactController.js'
import requireAuth from '../middlewear/requireAuth.js'

const router = express.Router()

// router.use(requireAuth)

router.post('/create', createContact)
router.get('/:id', getContact)
router.get('/', getAllContacts)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

export default router