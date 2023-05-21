const { Router }=require('express');
const router=Router();
const { getAllUsers, getUserById, getUserByName, createUser, modifyUser, verifyUser }=require('../controllers/user.controllers.js');

router.get('/',getAllUsers)
router.get('/:id',getUserById)
router.get('/:name', getUserByName)
router.post('/new',createUser)
router.post('/modifyuser',modifyUser)
router.post('/verifyuser',verifyUser)

module.exports = router;