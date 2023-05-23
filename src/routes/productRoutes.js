const { Router }=require('express');
const router=Router();
const {getAllProducts, getProductById, getProductByName, createProduct, modifyProduct, sortProducts}=require('../controllers/product.controllers.js');

router.get('',getProductByName)
router.get('',getAllProducts)
router.get('/:id',getProductById)
router.post('/sort',sortProducts)
router.post('/new',createProduct)
router.post('/modifyproduct',modifyProduct)

module.exports = router;