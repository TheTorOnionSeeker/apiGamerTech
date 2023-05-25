const { Router }=require('express');
const router=Router();
const { createCart, getCartById }=require('../controllers/cart.controllers.js');

/* router.get('/deleteCart',deleteCart)
router.post('/modifyCart',modifyCart) */
router.post('/new',createCart)
router.get('/:id',getCartById)

module.exports = router;