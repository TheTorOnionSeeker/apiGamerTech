const { Router }=require('express');
const router=Router();
const { createCart, getCartByUserId }=require('../controllers/cart.controllers.js');

/* router.get('/deleteCart',deleteCart)
router.post('/modifyCart',modifyCart) */
router.post('/new',createCart)
router.get('/:id',getCartByUserId)

module.exports = router;