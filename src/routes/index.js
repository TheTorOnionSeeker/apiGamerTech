const {Router}=require('express');
const router=Router();

const productRouter=require('./productRoutes')
const usersRouter=require('./usersRoutes')

router.use('/product',productRouter)
router.use('/users',usersRouter)

module.exports = router;