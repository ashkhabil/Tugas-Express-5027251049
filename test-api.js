const express = require('express');
const http = require('http');

async function runTests() {
  // Start server
  delete require.cache[require.resolve('./index.js')];
  process.env.PORT = '3001';
  
  // We can require index.js or spawn server
  const { exec } = require('child_process');
  const serverProcess = exec('node index.js', { env: { ...process.env, PORT: '3001' } });
  
  // wait 2 seconds for server to start
  await new Promise(r => setTimeout(r, 2000));
  
  const baseUrl = 'http://localhost:3001';
  
  try {
    console.log('--- 1. TEST GET /products ---');
    let res = await fetch(`${baseUrl}/products`);
    let data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 2. TEST GET /products/1 ---');
    res = await fetch(`${baseUrl}/products/1`);
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 3. TEST GET /products/999 (404) ---');
    res = await fetch(`${baseUrl}/products/999`);
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 4. TEST POST /products (Validasi Gagal - price kosong) ---');
    res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Penggaris' })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 5. TEST POST /products (Validasi Gagal - name kosong) ---');
    res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', price: 3000 })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 6. TEST POST /products (Sukses) ---');
    res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Penggaris Segitiga', price: 7500 })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);
    const createdId = data.id;

    console.log('\n--- 7. TEST PUT /products (Sukses - ID di Body) ---');
    res = await fetch(`${baseUrl}/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: createdId, name: 'Penggaris Besi 30cm', price: 12000 })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 8. TEST PUT /products (Validasi Gagal - ID tidak ditemukan) ---');
    res = await fetch(`${baseUrl}/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 99999, name: 'Barang Gaib', price: 50000 })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 9. TEST DELETE /products/:id (Sukses) ---');
    res = await fetch(`${baseUrl}/products/${createdId}`, {
      method: 'DELETE'
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 10. TEST DELETE /products/:id (404 - sudah terhapus) ---');
    res = await fetch(`${baseUrl}/products/${createdId}`, {
      method: 'DELETE'
    });
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n--- 11. FINAL GET /products (Data akhir setelah delete) ---');
    res = await fetch(`${baseUrl}/products`);
    data = await res.json();
    console.log(`Status: ${res.status}`, data);

    console.log('\n>>> SEMUA PENGUJIAN API BERHASIL! <<<');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    serverProcess.kill();
    process.exit(0);
  }
}

runTests();
