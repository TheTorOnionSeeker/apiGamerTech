const { Router }=require('express');
const router=Router();
const {getAllProducts, getProductById, getProductByName, createProduct}=require('../controllers/product.controllers.js');

router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.get('/:name', getProductByName)
router.post('/new',createProduct)
router.post('/modifyproduct',modifyProduct)

module.exports = router;