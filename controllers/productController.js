const prisma = require('../prismaClient');

// GET /products - Mengembalikan array seluruh produk dengan status 200
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

// GET /products/:id - Mengembalikan objek produk atau 404 jika tidak ada
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID harus berupa angka' });
    }

    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'produk tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

// POST /products - Menerima name dan price, membuat data baru di database, status 201
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Validasi input: name wajib diisi dan bertipe string non-kosong
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Validasi gagal: Nama produk wajib diisi' });
    }

    // Validasi input: price wajib diisi dan berupa angka positif
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ message: 'Validasi gagal: Harga produk harus berupa angka positif' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price: parseInt(price),
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

// PUT /products/:id atau PUT /products (dengan id di body) - Mengupdate data yang sudah ada
const updateProduct = async (req, res) => {
  try {
    // Ambil ID dari req.body.id (sesuai spesifikasi instruksi) atau fallback req.params.id
    const rawId = req.body.id !== undefined ? req.body.id : req.params.id;
    const id = parseInt(rawId);

    if (!rawId || isNaN(id)) {
      return res.status(400).json({ message: 'Validasi gagal: ID produk wajib disertakan dan berupa angka' });
    }

    const { name, price } = req.body;

    // Validasi input: name
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Validasi gagal: Nama produk wajib diisi' });
    }

    // Validasi input: price
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ message: 'Validasi gagal: Harga produk harus berupa angka positif' });
    }

    // Cek apakah data dengan ID tersebut ada di database
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Produk dengan ID ${id} tidak ditemukan` });
    }

    // Lakukan update pada database
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: name.trim(),
        price: parseInt(price),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

// DELETE /products/:id atau DELETE /products (berdasarkan id) - Menghapus data dari database
const deleteProduct = async (req, res) => {
  try {
    const rawId = req.params.id !== undefined ? req.params.id : req.body.id;
    const id = parseInt(rawId);

    if (!rawId || isNaN(id)) {
      return res.status(400).json({ message: 'Validasi gagal: ID produk wajib disertakan dan berupa angka' });
    }

    // Cek apakah data produk ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Produk dengan ID ${id} tidak ditemukan` });
    }

    await prisma.product.delete({
      where: { id: id },
    });

    res.status(200).json({ message: `Produk dengan ID ${id} berhasil dihapus` });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
