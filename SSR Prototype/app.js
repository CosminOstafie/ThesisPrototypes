const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));  

app.get('/', (req,res)=>{
    res.render('home')
})



  app.get('/products', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM products LIMIT 50;');
        res.render('products', {pageTitle:"Products",products: result.rows})

    }catch(err){
        console.error("Database error:",err.stack)
        res.status(500).send("Server error");
    }
    
  });

  app.get('/products/:id', async (req,res)=>{
    const productId = req.params.id;
    try{
        const result = await db.query('SELECT * FROM products WHERE id = $1;',[productId]);
        if(result.rows.length === 0 ){ return res.status(404).send('Product not found')};
        const product = result.rows[0];
        res.render('product',{
            pageTitle: product.name,
            product
        })
    } catch(err){
        console.error("Error retrieving product: ", err.stack)
        res.status(500).send("Server error");
    }
  })

app.listen(PORT,()=>{
    console.log(`SSR Server running on http://localhost:${PORT}`)
})