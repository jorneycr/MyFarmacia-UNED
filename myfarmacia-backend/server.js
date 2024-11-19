const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const Stripe = require('stripe');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
require("dotenv").config({ path: "./.env.development" });

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require("cors");

//crear servidor
const app = express();

app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

//habilitar bodyParser
app.use(express.json({ limit: '10kb' })); // Limita el tamaño de JSON a 10 KB
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Limita el tamaño de datos codificados en URL

const corsOptions = {
  origin: [process.env.FRONTEND_URL_DEV],
  methods: 'GET,HEAD,POST',
  credentials: true
};

app.use(cors(corsOptions));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const stripe = Stripe(process.env.SECRET_STRIPE); // Clave secreta de Stripe

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    // Crear un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servir archivos estáticos con restricciones
app.use(express.static(path.join(__dirname, 'frontend/build'), {
  dotfiles: 'deny',    // Impide el acceso a archivos ocultos (ej., .env)
  index: false         // Deshabilita la generación de índices de directorio
}));

// Configura la ruta principal para redirigir a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Configura opciones SSL usando los nuevos archivos de certificados de mkcert
const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
  //Deshabilitar Protocolos Inseguros (TLS 1.0 y 1.1)
  secureProtocol: 'TLSv1_2_method'
};

// Configurar Headers de Seguridad
app.use(helmet());

// Inicia el servidor HTTPS
const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
