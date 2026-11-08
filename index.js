require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk mem-parsing body request dalam format JSON
app.use(express.json());

// Root endpoint sebagai penanda server berjalan
app.get('/', (req, res) => {
  res.json({ message: 'API Express & Prisma aktif. Gunakan endpoint /products.' });
});

// Menggunakan route untuk endpoint /products
app.use('/products', productRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
