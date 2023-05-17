const {Router}=require('express');
const router=Router();

const productRouter=require('./productRoutes')

router.use('/product',productRouter)

module.exports = router;