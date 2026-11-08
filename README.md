# Tugas Express REST API dengan Prisma ORM

Proyek tugas mata kuliah Pemrograman Website (Teknologi Informasi / ITS) untuk mengimplementasikan REST API menggunakan **Express.js** yang terhubung ke database cloud PostgreSQL (Neon) melalui **Prisma ORM**.

## Identitas Mahasiswa
- **Nama**: Ashkhabil Abror Budihardjo
- **NRP**: 5027251049

---

## Fitur & Endpoint API

Semua endpoint berakar pada path `/products`:

| Method | Endpoint | Deskripsi | Keterangan |
|---|---|---|---|
| `GET` | `/products` | Menampilkan seluruh data produk | Status `200 OK` |
| `GET` | `/products/:id` | Menampilkan data produk berdasarkan ID | Status `200 OK` / `404 Not Found` |
| `POST` | `/products` | Membuat data produk baru | Status `201 Created` / `400 Bad Request` |
| `PUT` | `/products` atau `/products/:id` | Mengupdate data produk yang sudah ada | Status `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/products/:id` | Menghapus data produk berdasarkan ID | Status `200 OK` / `404 Not Found` |

### Format Body Request:
- **POST `/products`**:
  ```json
  {
    "name": "Buku Tulis",
    "price": 15000
  }
  ```
- **PUT `/products`** (Sesuai ketentuan tugas: body sama dengan POST namun ada tambahan id):
  ```json
  {
    "id": 1,
    "name": "Buku Tulis Sidu 38 Lembar",
    "price": 18000
  }
  ```

### Validasi Input:
- `name`: Wajib diisi dan bertipe string non-kosong. Jika tidak valid mengembalikan `400 Bad Request`.
- `price`: Wajib diisi dan berupa angka positif (`> 0`). Jika tidak valid mengembalikan `400 Bad Request`.
- `id` (pada PUT/DELETE): Harus ada dan berupa integer yang valid. Jika data tidak ditemukan di database mengembalikan `404 Not Found`.

---

## Struktur Folder

```text
Tugas Express/
├── controllers/
│   └── productController.js      # Controller logika bisnis CRUD & validasi
├── prisma/
│   ├── schema.prisma             # Skema Prisma ORM (Model Product)
│   └── seed.js                   # Seeder data awal
├── routes/
│   └── productRoute.js           # Definisi routing endpoint /products
├── .env.example                  # Template konfigurasi environment
├── .gitignore                    # Mengabaikan node_modules dan .env
├── index.js                      # Entry point aplikasi Express
├── package.json                  # Konfigurasi dependensi & scripts
├── prismaClient.js               # Inisialisasi Prisma Client singleton
└── Tugas_Express_Prisma.postman_collection.json # File collection Postman siap pakai
```

---

## Cara Instalasi & Menjalankan Proyek

1. **Clone repository:**
   ```bash
   git clone https://github.com/ashkhabil/Tugas-Express-5027251049.git
   cd Tugas-Express-5027251049
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment (`.env`):**
   Salin `.env.example` ke `.env` lalu masukkan connection string database PostgreSQL Anda:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST/DATABASE?sslmode=require"
   ```

4. **Sinkronisasi Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Isi Data Awal (Opsional - Seeding):**
   ```bash
   npm run seed
   ```

6. **Jalankan Server:**
   ```bash
   npm run dev
   # Server berjalan di http://localhost:3000
   ```

7. **Buka GUI Database (Prisma Studio):**
   ```bash
   npm run studio
   # Buka browser di http://localhost:5555 untuk melihat dan screenshot data
   ```

---

## Pengujian dengan Postman
Import file `Tugas_Express_Prisma.postman_collection.json` ke aplikasi Postman / Bruno / Hoppscotch untuk melakukan pengujian otomatis terhadap skenario success dan validasi error.
