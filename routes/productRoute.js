const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET: menampilkan seluruh data
router.get('/', productController.getAllProducts);

// GET: menampilkan satu produk berdasarkan ID
router.get('/:id', productController.getProductById);

// POST: membuat data baru
router.post('/', productController.createProduct);

// PUT: mengupdate data yang sudah ada (body sama dengan post namun ada tambahan id)
// Mendukung PUT /products/:id dan PUT /products (dengan id di body)
router.put('/:id', productController.updateProduct);
router.put('/', productController.updateProduct);

// DELETE: menghapus data yang sudah ada (berdasarkan id)
// Mendukung DELETE /products/:id dan DELETE /products (dengan id di body)
router.delete('/:id', productController.deleteProduct);
router.delete('/', productController.deleteProduct);

module.exports = router;
