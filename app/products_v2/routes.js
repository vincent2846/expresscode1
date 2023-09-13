const router = require('express').Router();
const Product = require('./model');
const multer = require('multer');
const upload = multer({dest: 'uploads'})
const path = require('path');
const fs = require('fs');

router.get('/product', async (req, res) => {
    try{
        await Product.sync();
        const result = await Product.findAll()
        res.send(result);
    }catch (e){
        res.send(e);
    }
});

router.get('/product', async (req, res) => {
    const {search} = req.query;
    if(search){
        try{
            await Product.sync();
            const result = await Product.findAll({
                where: {
                    name: [`%${search}%`]
                }
            })
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }else{
        try{
            await Product.sync();
            const result = await Product.findAll()
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }
});

router.delete('/product/:id', upload.single('image'), async (req, res) => {
    try{
        const result = await Product.destroy({
            where: {
                id: [req.params.id] 
            }
        })
        res.send('result');
    }catch (e){
        res.send(e);
    }
});

router.post('/product/',upload.single('image'), async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        try{
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }
});

router.put('/product/:id',upload.single('image'), async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        try{
            await Product.sync();
            const result = await Product.update({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`}, 
            {where: {
                id: [req.params.id] 
            }})
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }else{
        try{
            await Product.sync();
            const result = await Product.update({users_id, name, price, stock, status}, 
                {where: {
                    id: [req.params.id] 
                }})
            res.send(result);
        }catch (e){
            res.send(e);
        }
    }
});



module.exports = router;