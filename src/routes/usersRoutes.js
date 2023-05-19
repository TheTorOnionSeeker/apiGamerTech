const { Router }=require('express');
const router=Router();
const { getAllUsers, getUserById, getUserByName, createUser, modifyUser }=require('../controllers/user.controllers.js');

router.get('/',getAllUsers)
router.get('/:id',getUserById)
router.get('/:name', getUserByName)
router.post('/new',createUser)
router.post('/modifyproduct',modifyUser)

module.exports = router;