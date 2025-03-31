const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req,res) => {
    try{
        const result = await db.query('SELECT * FROM products LIMIT 50;');
        res.json(result.rows)
    }catch(err){
        console.error("Error fetching products",err.stack)
        res.status(500).json({error:"Server error"});
    }
})

router.get('/:id', async (req,res) => {
    const productId = req.params.id;
    try{
        const result = await db.query('SELECT * FROM products WHERE id=$1;',[productId])
        if(result.rows.length === 0){
            return res.status(404).json({error:"Product not found"});
        }
        res.json(result.rows[0]);
    }catch(err){
        console.error("Error fetching product",err.stack)
        res.status(500).json({error:'Server error'})
    }
})

module.exports = router;