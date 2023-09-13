const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'})
// const fs = require('fs');
// const path = require('path');
const connection = require('../../config/mysql')
const productController = require('./controller')


router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product/',upload.single('image'), productController.store)
router.put('/product/:id', upload.single('image'),productController.update);
router.delete('/product/:id', upload.single('image'),productController.destroy);



// router.get('/', (req,res)=> {
    // const {page, total} = req.query;
    // res.send({
    //     status: 'Successfully',
    //     message: 'Welcome to Express HH JS Tutor',
    //     page,
    //     total

    // })
// })

// Materi Sebelumnya
// router.get('/product/:id',upload.single('image'),(req,res) => {
//     // console.log(req.query);
//     res.json({
//         id: req.params.id
//     })
// })

// router.post('/product/',(req,res) => {
//     const{name, price, stock, status} = req.body;
//     const image = req.filter;
//     if(image){
//         const target = path.join(__dirname, 'uploads', image.originalname);
//         fs.renameSync(image.path, target)
//     }
//     // console.log(req.file)
//     // res.json({
//     //     name,
//     //     price,
//     //     stock,
//     //     status,
//     //     image
//     // })

//     res.sendFile(target);
// })

// router.get('/:category/:tag',(req,res) => {
//     const {category, tag} = req.params;
//     res.json({category,tag})
// })
// router.get('/category/:tag',(req,res) => {
//     const {category, tag} = req.params;
//     res.json({
//         category: category,
//         tag: tag
//     })
// })
module.exports = router;