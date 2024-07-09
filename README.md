# Readme Squirrel - Aplikasi Kasir dan Management Produk

## Fitur Utama

- **Autentikasi**: Sistem otentikasi menggunakan JWT (JSON Web Tokens) untuk menjaga keamanan akun pengguna.

- **Manajemen**: Aplikasi digunakan sebagai alat bantu transaksi dan juga pembukuan secara otomatis, serta dapat melihat analityc provit toko

- **RestAPI**: Backend menyediakan endpoint-endpoint RestAPI yang digunakan oleh frontend untuk berkomunikasi dengan server.

- **Keamanan**: Kami menempatkan keamanan sebagai prioritas utama. Data pengguna dan transaksi dienkripsi dan dilindungi dengan baik.

## Teknologi Utama

Aplikasi Tix Event Backend dibangun dengan menggunakan teknologi berikut:

- **Express JS**: Framework Node.js yang digunakan untuk membuat server backend.

- **MySQL**: digunakan sebagai database .

- **JWT (JSON Web Tokens)**: Digunakan untuk otentikasi dan otorisasi pengguna.

- **RestAPI**: Digunakan untuk berkomunikasi dengan frontend dan menyediakan layanan kepada pengguna.

- **Axios**: Library HTTP client untuk membuat permintaan HTTP dari frontend ke backend.

- **Nodemailer**: sebagai tekonoli pembatu dalam pengiriman pesan email berupa code OTP

## Pengembangan Lokal

Jika Anda ingin menjalankan Tix Event Backend di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut:

1. Clone repositori ini:

   ```bash
   git clone https://github.com/putubagus13/store_booknote_backend/
   cd store_booknote_backend
   ```

2. Instal semua dependensi:

   ```bash
   npm install
   ```

3. Buat berkas konfigurasi `.env` berdasarkan `.env.example` dan sesuaikan dengan pengaturan Anda.

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Server backend akan berjalan di [http://localhost:3600](http://localhost:3600).

---
© 2023 Squirrel. Dikembangkan oleh Putu Bagus Raditya.
