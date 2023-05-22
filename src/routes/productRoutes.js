const { Router }=require('express');
const router=Router();
const {getAllProducts, getProductById, getProductByName, createProduct, modifyProduct}=require('../controllers/product.controllers.js');

router.get('/',getAllProducts,getProductByName)
router.get('/:id',getProductById)
//router.get('/:name', getProductByName)
router.post('/new',createProduct)
router.post('/modifyproduct',modifyProduct)

module.exports = router;