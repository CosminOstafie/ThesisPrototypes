//Server Variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = 3001;
const app = express();

const productRoutes = require('./routes/products');

//Middleware
app.use(cors());
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());

//API Routes
app.use('/api/products', productRoutes);

// app.use(express.static(path.join(__dirname,'../public')));

app.listen(PORT, () => {
    console.log(`CSR Prototype running at http://localhost:${PORT} `);
});