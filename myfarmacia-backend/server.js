// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const connectDB = require('./config/db');

// const app = express();
// connectDB();

// app.use(express.json());
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

// // Serve static frontend
// app.use(express.static(path.join(__dirname, '../myfarmacia-frontend/build')));
// app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../myfarmacia-frontend/build', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

